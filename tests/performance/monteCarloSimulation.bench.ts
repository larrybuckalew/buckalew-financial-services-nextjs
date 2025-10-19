        parallel efficiency
      expect(result.efficiency).toBeGreaterThan(50); // At least 50% efficiency
    });
  });

  it('tests cache effectiveness', () => {
    const cache = new Map<string, any>();
    const scenarios = [
      { ...defaultInputs },
      { ...defaultInputs, currentAge: 35 },
      { ...defaultInputs, monthlyContribution: 2000 }
    ];

    const results: Array<{
      scenario: string;
      uncachedTime: number;
      cachedTime: number;
      speedup: number;
    }> = [];

    scenarios.forEach((inputs, index) => {
      const cacheKey = JSON.stringify(inputs);

      // First run - no cache
      const start1 = performance.now();
      const simulation1 = MonteCarloSimulator.runSimulation(inputs);
      const uncachedTime = performance.now() - start1;

      cache.set(cacheKey, simulation1);

      // Second run - with cache
      const start2 = performance.now();
      const simulation2 = cache.get(cacheKey) || MonteCarloSimulator.runSimulation(inputs);
      const cachedTime = performance.now() - start2;

      results.push({
        scenario: `Scenario ${index + 1}`,
        uncachedTime,
        cachedTime,
        speedup: uncachedTime / cachedTime
      });
    });

    console.table(results);

    // Cache should provide significant speedup
    results.forEach(result => {
      expect(result.speedup).toBeGreaterThan(10); // At least 10x speedup with cache
    });
  });

  it('measures CPU utilization', () => {
    const scenarios = [1000, 5000, 10000].map(runs => ({
      runs,
      cpuUsage: process.cpuUsage()
    }));

    const results = scenarios.map(scenario => {
      const startCPU = process.cpuUsage();
      
      MonteCarloSimulator.runSimulation(defaultInputs, {
        simulationRuns: scenario.runs
      });
      
      const cpuUsage = process.cpuUsage(startCPU);
      
      return {
        runs: scenario.runs,
        userCPUTime: cpuUsage.user / 1000,
        systemCPUTime: cpuUsage.system / 1000,
        totalCPUTime: (cpuUsage.user + cpuUsage.system) / 1000
      };
    });

    console.table(results);

    // CPU usage should scale reasonably with simulation size
    const cpuTimePerRun = results.map(r => r.totalCPUTime / r.runs);
    for (let i = 1; i < cpuTimePerRun.length; i++) {
      // CPU time per run shouldn't increase more than 20% as scale increases
      expect(cpuTimePerRun[i] / cpuTimePerRun[i-1]).toBeLessThan(1.2);
    }
  });

  it('tests numerical stability', () => {
    const extremeInputs = [
      { ...defaultInputs, currentSavings: 1_000_000_000 }, // Large initial value
      { ...defaultInputs, monthlyContribution: 0.01 },     // Very small contribution
      { ...defaultInputs, expectedReturn: 0.0001 },        // Tiny return rate
      { ...defaultInputs, inflationRate: 20 }              // High inflation
    ];

    const results = extremeInputs.map((inputs, index) => {
      const start = performance.now();
      let error = null;
      let simulation = null;

      try {
        simulation = MonteCarloSimulator.runSimulation(inputs);
      } catch (e) {
        error = e;
      }

      return {
        scenario: `Extreme ${index + 1}`,
        time: performance.now() - start,
        success: !error,
        error: error?.message || null,
        resultValid: simulation && 
          !isNaN(simulation.median) && 
          isFinite(simulation.median)
      };
    });

    console.table(results);

    // All calculations should complete without numerical errors
    results.forEach(result => {
      expect(result.success).toBe(true);
      expect(result.resultValid).toBe(true);
    });
  });

  it('performs load testing with concurrent users', async () => {
    const users = 10;
    const requestsPerUser = 5;
    const results: Array<{
      userID: number;
      requestID: number;
      time: number;
      success: boolean;
    }> = [];

    const makeRequest = async (userID: number, requestID: number) => {
      const start = performance.now();
      try {
        await MonteCarloSimulator.runSimulation(defaultInputs);
        return {
          userID,
          requestID,
          time: performance.now() - start,
          success: true
        };
      } catch (error) {
        return {
          userID,
          requestID,
          time: performance.now() - start,
          success: false
        };
      }
    };

    const requests = Array(users).fill(null).flatMap((_user, userID) =>
      Array(requestsPerUser).fill(null).map((_req, requestID) =>
        makeRequest(userID, requestID)
      )
    );

    const allResults = await Promise.all(requests);
    results.push(...allResults);

    console.table(results);

    // Calculate response time percentiles
    const times = results.map(r => r.time).sort((a, b) => a - b);
    const p50 = times[Math.floor(times.length * 0.5)];
    const p90 = times[Math.floor(times.length * 0.9)];
    const p99 = times[Math.floor(times.length * 0.99)];

    console.log('Response Time Percentiles:', { p50, p90, p99 });

    // Performance requirements
    expect(p50).toBeLessThan(1000);  // 50th percentile under 1s
    expect(p90).toBeLessThan(2000);  // 90th percentile under 2s
    expect(p99).toBeLessThan(5000);  // 99th percentile under 5s
  });
});