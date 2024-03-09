let sel;
let my;
before(() => {
    cy.fixture('selectors').then((selectors) => {
      sel = selectors;
    });
    cy.fixture('credentials').then((credentials) => {
      my = credentials;
    });
  });

  Cypress.Commands.add('login', () => {
   cy.get(sel.loginIcon.loginButton).click();
})
Cypress.Commands.add('validLogin', () => {
    cy.get(sel.loginPage.email).type(my.email);
    cy.get(sel.loginPage.password).type(my.password);
    cy.get(sel.loginPage.submitButton).click();
 });

 Cypress.Commands.add('invalidLogin', () => {
    cy.get(sel.loginPage.email).type(my.email);
    cy.get(sel.loginPage.password).type('admin1237888');
    cy.get(sel.loginPage.submitButton).click();
    cy.contains('Invalid User Credentials');
 });

 Cypress.Commands.add('blankLogin', () => {
    cy.get(sel.loginPage.submitButton).click();
    cy.contains('Email Address is required');
    cy.contains('Password is required');
 })