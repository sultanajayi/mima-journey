import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"
import {faker} from '@faker-js/faker'

let sel

let inboxId
let emailAddress
let emailBody
let otpValue

before(function () {
  cy.fixture('selectors').then((data) => {
    sel = data
  })
})

Given(/^User is on trymima page$/, () => {
	cy.visit('/')
});

When(/^User Clicks Sign Up Button$/, () => {
	cy.clickElement(sel.signUpPage.signupButton)
});

When(/^User fills in a valid full name$/, () => {
	cy.typeAValue(sel.basicDetailsPage.fullnameField, faker.person.fullName())
});

When(/^User fills in a valid business name$/, () => {
	cy.typeAValue(sel.basicDetailsPage.bizNameField, faker.company.buzzNoun())
});

When(/^User fills in a valid business email$/, () => {
	// create an email address with mailslurp
  cy.insertEmail()

});

When(/^User fills in a valid phone number$/, () => {
	cy.typeAValue(sel.basicDetailsPage.bizPhoneNum, faker.phone.number('+23480########'))
});

When(/^User fills in a valid business registration number$/, () => {
	cy.typeAValue(sel.basicDetailsPage.bizRegNum, faker.commerce.isbn())
});

When(/^User Clicks the Next Button$/, () => {
	cy.clickElement(sel.basicDetailsPage.nextBtn)
});

When(/^User fills in a valid website name$/, () => {
	cy.typeAValue(sel.otherDetailsPage.WebField, faker.internet.domainName())
});

When(/^User fills in a valid instagram handle$/, () => {
	cy.typeAValue(sel.otherDetailsPage.InsField, faker.company.buzzVerb())
});

When(/^User fills in a valid twitter handle$/, () => {
	cy.typeAValue(sel.otherDetailsPage.TwtField, faker.company.buzzNoun())
});

When(/^User selects how they heard about mima$/, () => {
	cy.clickElement(sel.otherDetailsPage.heardAboutUs)
	cy.clickElement(sel.otherDetailsPage.InsOption)
});

When(/^User inserts password$/, () => {
	cy.typeAValue(sel.otherDetailsPage.passwordField, faker.internet.password())
});

When(/^User clicks the SignUp Button$/, () => {
	cy.clickElement(sel.otpPage.submitButton)
});

Then(/^User sees token notification message$/, () => {
  cy.get(sel.otpPage.otpMessage).invoke('text').then((message) => {
      expect(message).to.contain('To make sure we’ve got your details right,we’ve sent a 5 digit code to your registered email')
      cy.log(message)
  })
});

Then(/^User retrieves token from email$/, () => {
	// retrieve token from the email
  cy.retrieveToken()
});

When(/^User inserts token on the token page$/, () => {
	// insert the OTP
  cy.insertOTP()
});

Then(/^The user should have access to the home page$/, () => {
	// Verify Page access is successful
  cy.url().should("include", "home")
  cy.get('.Sidebar_sb_nav_ul__SIy2E > li:nth-of-type(1)').should('contain', 'Home')
});
