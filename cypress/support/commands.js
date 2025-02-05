// ***********************************************
// Custom commands can go here
// ***********************************************

// Example of a custom command
Cypress.Commands.add('dataCy', (value) => {
  return cy.get(`[data-cy=${value}]`);
});

// Add utility functions for testing
Cypress.Commands.add('assertUrlContains', (path) => {
  cy.url().should('include', path);
});

// Add network request mocking
Cypress.Commands.add('mockApiCall', (method, url, fixture) => {
  cy.intercept(method, url, {
    fixture: fixture
  }).as('apiCall');
});