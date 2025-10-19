describe('Homepage', () => {
  beforeEach(() => {
    // Visit the homepage before each test
    cy.visit('/');
  });

  it('loads successfully', () => {
    // Check if the page loads without errors
    cy.get('body').should('be.visible');
  });

  it('has correct page title', () => {
    // Verify the page title
    cy.title().should('include', 'Buckalew Financial Services');
  });

  it('renders main navigation', () => {
    // Check for main navigation elements
    cy.get('nav').should('be.visible');
    cy.get('nav a').should('have.length.greaterThan', 0);
  });

  it('has responsive design', () => {
    // Test responsiveness
    cy.viewport('iphone-6');
    cy.get('body').should('be.visible');

    cy.viewport('macbook-15');
    cy.get('body').should('be.visible');
  });
});