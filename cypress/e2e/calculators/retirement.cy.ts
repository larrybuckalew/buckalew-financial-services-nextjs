describe('Retirement Calculator', () => {
  beforeEach(() => {
    cy.visit('/calculators/retirement');
    cy.intercept('POST', '/api/retirement').as('calculateRetirement');
    cy.intercept('POST', '/api/retirement/social-security').as('calculateSocialSecurity');
  });

  it('performs end-to-end retirement calculation', () => {
    // Fill basic information
    cy.get('[data-cy="current-age"]').type('30');
    cy.get('[data-cy="retirement-age"]').type('65');
    cy.get('[data-cy="current-savings"]').type('50000');
    cy.get('[data-cy="monthly-contribution"]').type('1000');
    cy.get('[data-cy="expected-return"]').type('7');
    cy.get('[data-cy="inflation-rate"]').type('2');
    cy.get('[data-cy="desired-income"]').type('80000');

    // Calculate
    cy.get('[data-cy="calculate-button"]').click();

    // Wait for API calls
    cy.wait('@calculateRetirement');
    cy.wait('@calculateSocialSecurity');

    // Verify results appear
    cy.get('[data-cy="results-section"]', { timeout: 10000 }).should('be.visible');
    cy.get('[data-cy="total-savings"]').should('contain', '$');
    cy.get('[data-cy="monthly-income"]').should('contain', '$');

    // Verify charts
    cy.get('[data-cy="savings-chart"]').should('be.visible');
    cy.get('[data-cy="income-chart"]').should('be.visible');
  });

  it('handles Social Security integration', () => {
    // Fill out personal information
    cy.get('[data-cy="current-age"]').type('40');
    cy.get('[data-cy="retirement-age"]').type('67');
    cy.get('[data-cy="annual-income"]').type('75000');

    // Enable Social Security calculation
    cy.get('[data-cy="include-social-security"]').click();

    // Calculate
    cy.get('[data-cy="calculate-button"]').click();

    // Wait for API calls
    cy.wait('@calculateRetirement');
    cy.wait('@calculateSocialSecurity');

    // Verify Social Security results
    cy.get('[data-cy="social-security-section"]').should('be.visible');
    cy.get('[data-cy="ss-monthly-benefit"]').should('contain', '$');
    cy.get('[data-cy="ss-total-by-90"]').should('contain', '$');
  });

  it('saves and compares multiple scenarios', () => {
    // Create conservative scenario
    cy.get('[data-cy="add-scenario"]').click();
    cy.get('[data-cy="scenario-name"]').type('Conservative');
    cy.get('[data-cy="monthly-contribution"]').type('500');
    cy.get('[data-cy="expected-return"]').type('5');
    cy.get('[data-cy="save-scenario"]').click();

    // Create aggressive scenario
    cy.get('[data-cy="add-scenario"]').click();
    cy.get('[data-cy="scenario-name"]').type('Aggressive');
    cy.get('[data-cy="monthly-contribution"]').type('2000');
    cy.get('[data-cy="expected-return"]').type('9');
    cy.get('[data-cy="save-scenario"]').click();

    // Compare scenarios
    cy.get('[data-cy="compare-scenarios"]').click();

    // Verify comparison results
    cy.get('[data-cy="scenario-comparison"]').should('be.visible');
    cy.get('[data-cy="scenario-chart"]').should('be.visible');
    cy.get('[data-cy="comparison-table"]').within(() => {
      cy.contains('Conservative');
      cy.contains('Aggressive');
    });
  });

  it('performs Monte Carlo simulation', () => {
    // Fill basic information
    cy.get('[data-cy="current-age"]').type('35');
    cy.get('[data-cy="retirement-age"]').type('65');
    cy.get('[data-cy="current-savings"]').type('100000');
    cy.get('[data-cy="monthly-contribution"]').type('1000');

    // Enable Monte Carlo simulation
    cy.get('[data-cy="enable-monte-carlo"]').click();
    cy.get('[data-cy="simulation-count"]').type('1000');
    cy.get('[data-cy="volatility"]').type('15');

    // Run simulation
    cy.get('[data-cy="run-simulation"]').click();

    // Verify simulation results
    cy.get('[data-cy="simulation-results"]', { timeout: 15000 }).should('be.visible');
    cy.get('[data-cy="success-rate"]').should('be.visible');
    cy.get('[data-cy="simulation-chart"]').should('be.visible');
    cy.get('[data-cy="percentiles-table"]').should('be.visible');
  });

  it('handles market downturn scenarios', () => {
    // Fill basic information
    cy.get('[data-cy="current-age"]').type('40');
    cy.get('[data-cy="current-savings"]').type('200000');

    // Add market crash scenario
    cy.get('[data-cy="add-crash-scenario"]').click();
    cy.get('[data-cy="crash-year"]').type('2030');
    cy.get('[data-cy="crash-percentage"]').type('40');
    cy.get('[data-cy="recovery-years"]').type('5');

    // Calculate with crash scenario
    cy.get('[data-cy="calculate-with-crash"]').click();

    // Verify crash analysis
    cy.get('[data-cy="crash-analysis"]').should('be.visible');
    cy.get('[data-cy="crash-impact"]').should('be.visible');
    cy.get('[data-cy="recovery-path"]').should('be.visible');
  });

  it('exports data in multiple formats', () => {
    // Fill basic information and calculate
    cy.get('[data-cy="current-age"]').type('45');
    cy.get('[data-cy="current-savings"]').type('300000');
    cy.get('[data-cy="calculate-button"]').click();

    // Export PDF
    cy.get('[data-cy="export-pdf"]').click();
    cy.readFile('cypress/downloads/retirement-report.pdf').should('exist');

    // Export Excel
    cy.get('[data-cy="export-excel"]').click();
    cy.readFile('cypress/downloads/retirement-data.xlsx').should('exist');

    // Export CSV
    cy.get('[data-cy="export-csv"]').click();
    cy.readFile('cypress/downloads/retirement-data.csv').should('exist');
  });

  it('maintains state across page refreshes', () => {
    // Fill form
    cy.get('[data-cy="current-age"]').type('50');
    cy.get('[data-cy="current-savings"]').type('400000');
    
    // Save state
    cy.get('[data-cy="save-state"]').click();
    
    // Refresh page
    cy.reload();
    
    // Verify state persisted
    cy.get('[data-cy="current-age"]').should('have.value', '50');
    cy.get('[data-cy="current-savings"]').should('have.value', '400000');
  });

  it('validates all inputs properly', () => {
    // Test all validation rules
    const validationTests = [
      {
        field: 'current-age',
        value: '100',
        error: 'age-error',
        message: 'Age must be less than 100'
      },
      {
        field: 'current-savings',
        value: '-1',
        error: 'savings-error',
        message: 'Amount cannot be negative'
      },
      {
        field: 'expected-return',
        value: '101',
        error: 'return-error',
        message: 'Return must be between 0 and 100'
      }
    ];

    validationTests.forEach(test => {
      cy.get(`[data-cy="${test.field}"]`).type(test.value);
      cy.get(`[data-cy="${test.error}"]`)
        .should('be.visible')
        .and('contain', test.message);
    });
  });
});