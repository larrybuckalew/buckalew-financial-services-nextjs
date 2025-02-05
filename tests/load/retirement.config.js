module.exports = {
  // Load test configuration
  scenarios: [
    {
      name: 'Basic retirement calculation',
      endpoint: '/api/retirement',
      method: 'POST',
      body: {
        currentAge: 30,
        retirementAge: 65,
        currentSavings: 50000,
        monthlyContribution: 1000,
        expectedReturn: 7,
        inflationRate: 2,
        desiredRetirementIncome: 80000
      },
      rampUp: 30,  // Ramp up time in seconds
      duration: 300,  // Test duration in seconds
      targetRps: 10  // Target requests per second
    },
    {
      name: 'Monte Carlo simulation',
      endpoint: '/api/retirement/monte-carlo',
      method: 'POST',
      body: {
        inputs: {
          currentAge: 30,
          retirementAge: 65,
          currentSavings: 50000,
          monthlyContribution: 1000,
          expectedReturn: 7,
          inflationRate: 2,
          desiredRetirementIncome: 80000
        },
        simulationRuns: 1000
      },
      rampUp: 60,
      duration: 300,
      targetRps: 5
    }
  ],
  thresholds: {
    http_req_duration: ['p95<500'], // 95% of requests should complete within 500ms
    http_req_failed: ['rate<0.01'],  // Less than 1% failure rate
    vus: [{ target: 50, duration: '5m' }] // Virtual user count
  }
};