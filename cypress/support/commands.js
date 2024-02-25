// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
let inboxId
let sel
let emailAddress
let emailBody
let otpValue
before(function () {
    cy.fixture('selectors').then((data) => {
      sel = data
    })
  })
Cypress.Commands.add('clickElement', (element) =>{
    cy.get(element).should('be.visible').and('exist').click()
})

Cypress.Commands.add('typeAValue', (text_field, text_to_insert) =>{
    cy.get(text_field).should('be.visible').and('exist').fill(text_to_insert)
})

Cypress.Commands.add('insertEmail', () =>{cy.mailslurp().then(sultan => sultan.createInbox())
    .then(inbox =>{
      inboxId = inbox.id
      emailAddress = inbox.emailAddress
      cy.typeAValue(sel.basicDetailsPage.bizEmailField, emailAddress)
    })
})

Cypress.Commands.add('retrieveToken', () =>{
    cy.mailslurp().then(sultan => sultan.waitForLatestEmail(inboxId, 30000, true))
    .then(email =>{
      emailBody = email.body
      const extractor = new DOMParser()
      const doc  = extractor.parseFromString(emailBody,"text/html")
      const number = doc.querySelector('tr:nth-of-type(2) > td > table td > p:nth-of-type(3) > strong').textContent
      otpValue = number.trim()
    })
})

Cypress.Commands.add('insertOTP', () =>{
    cy.get('input').should('be.visible').each(($el, index)=>{
      cy.wrap($el).fill(otpValue[index])
    })
})