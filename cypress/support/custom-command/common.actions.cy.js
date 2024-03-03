import { faker } from '@faker-js/faker'

let inboxId
let sel
let user
let emailAddress
let emailBody
let otpValue
let newPassword = faker.person.firstName()+'Tests1@'
let filePath = 'cypress/fixtures/credentials.json'
before(function () {
    cy.fixture('selectors').then((data) => {
        sel = data
    })
    cy.fixture('credentials').then((cred) => {
        user = cred
    })
})

Cypress.Commands.add('clickElement', (element) => {
    cy.contains(element).should('be.visible').and('exist').click()
})

Cypress.Commands.add('selectReferalOption', () => {
    cy.get(sel.otherDetailsPage.heardAboutUs).should('be.visible').and('exist').click()
    cy.get(sel.otherDetailsPage.InsOption).should('be.visible').and('exist').click()
})

Cypress.Commands.add('selectAReferalOption', (string) => {
    cy.get(sel.otherDetailsPage.heardAboutUs).should('be.visible').and('exist').click()
    switch(string){
        case 'Facebook':
            cy.get(sel.otherDetailsPage.FbOption).should('be.visible').and('exist').click()
            break
        case 'Twitter':
            cy.get(sel.otherDetailsPage.TwiOption).should('be.visible').and('exist').click()
            break
        case 'Instagram':
            cy.get(sel.otherDetailsPage.InsOption).should('be.visible').and('exist').click()

    }
})

Cypress.Commands.add('typeAValue', (text_field, text_to_insert) => {
    cy.get(text_field).should('be.visible').and('exist').fill(text_to_insert)
})

Cypress.Commands.add('insertEmail', () => {
    cy.mailslurp().then(sultan => sultan.createInbox())
        .then(inbox => {
            inboxId = inbox.id
            emailAddress = inbox.emailAddress
            cy.typeAValue(sel.basicDetailsPage.bizEmailField, emailAddress)
            
            const userCredentials = `{
                "email": "${emailAddress}",
                "password": "${newPassword}"
            }`

            cy.writeFile(filePath, userCredentials)
        })
})

Cypress.Commands.add('retrieveToken', () => {
    cy.mailslurp().then(sultan => sultan.waitForLatestEmail(inboxId, 30000, true))
        .then(email => {
            emailBody = email.body
            const extractor = new DOMParser()
            const doc = extractor.parseFromString(emailBody, "text/html")
            const number = doc.querySelector('tr:nth-of-type(2) > td > table td > p:nth-of-type(3) > strong').textContent
            otpValue = number.trim()
        })
})

Cypress.Commands.add('insertOTP', () => {
    cy.get('input').should('be.visible').each(($el, index) => {
        cy.wrap($el).fill(otpValue[index])
    })
})

Cypress.Commands.add('insert', (string) => {
    switch (string) {
        case 'valid full name':
            cy.typeAValue(sel.basicDetailsPage.fullnameField, faker.person.fullName())
            break
        case 'valid business name':
            cy.typeAValue(sel.basicDetailsPage.bizNameField, faker.company.buzzNoun())
            break
        case 'valid business email':
            cy.insertEmail()
            break
        case 'valid phone number':
            cy.typeAValue(sel.basicDetailsPage.bizPhoneNum, faker.phone.number('+23480########'))
            break
        case 'valid business registration number':
            cy.typeAValue(sel.basicDetailsPage.bizRegNum, faker.commerce.isbn())
            break
        case 'valid twitter handle':
            cy.typeAValue(sel.otherDetailsPage.TwtField, faker.company.buzzNoun())
            break
        case 'valid instagram handle':
            cy.typeAValue(sel.otherDetailsPage.InsField, faker.company.buzzVerb())
            break
        case 'valid website name':
            cy.typeAValue(sel.otherDetailsPage.WebField, faker.internet.domainName())
            break
        case 'valid password':
            cy.typeAValue(sel.otherDetailsPage.passwordField, newPassword)
    }
})