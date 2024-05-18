describe('Login', () => {
  it('Go to the register page', () => {
    cy.visit('/#/login');
  });

  it('Click the register button without typing anything', () => {
    cy.visit('/#/login');
    cy.get('#registerButton').click();
  });

  it('Type incorrect values and click the register button', () => {
    cy.visit('/#/login');
    cy.get('input[name="registerFirstname"]').type('Hashen');
    cy.get('input[name="registerLastname"]').type('Abeysekara');
    cy.get('input[name="registerEmail"]').type('hashen@gmail.com');
    cy.get('input[name="registerUsername"]').type('hashen');
    cy.get('input[name="registerPassword"]').type('hashen');
    cy.get('#registerButton').click();
  });

  it('Type correct values and click the register button', () => {
    cy.visit('/#/login');
    cy.get('input[name="registerFirstname"]').type(`Hashen${Math.floor(Math.random() * 1000)}`);
    cy.get('input[name="registerLastname"]').type(`Abeysekara${Math.floor(Math.random() * 1000)}`);
    cy.get('input[name="registerEmail"]').type(`hashen${Math.floor(Math.random() * 1000)}@gmail.com`);
    cy.get('input[name="registerUsername"]').type(`hashen${Math.floor(Math.random() * 1000)}`);
    cy.get('input[name="registerPassword"]').type(`hashen${Math.floor(Math.random() * 1000)}`);
    cy.get('#registerButton').click();
  });
});
