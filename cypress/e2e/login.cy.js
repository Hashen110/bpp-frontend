describe('Login', () => {
  it('Go to the login page', () => {
    cy.visit('/#/login');
  });

  it('Click the login button without typing anything', () => {
    cy.visit('/#/login');
    cy.get('#loginButton').click();
  });

  it('Type incorrect values and click the login button', () => {
    cy.visit('/#/login');
    cy.get('input[name="loginUsername"]').type('Invalid Username');
    cy.get('input[name="loginPassword"]').type('Invalid Password');
    cy.get('#loginButton').click();
  });

  it('Type correct values and click the login button', () => {
    cy.visit('/#/login');
    cy.get('input[name="loginUsername"]').type('hashen');
    cy.get('input[name="loginPassword"]').type('hashen');
    cy.get('#loginButton').click();
  });
});
