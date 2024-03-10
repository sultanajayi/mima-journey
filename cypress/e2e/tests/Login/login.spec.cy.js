import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"


Given(/^User is on the login page$/, () => {
	cy.visit('/');
});

When(/^User clicks on the login button$/, () => {
	cy.login();
});

When(/^User enters email,password and click on submit button$/, () => {
	cy.validLogin();
});

Then(/^User should be able to login$/, () => {
	return true;
});


When(/^User enters email,invalid password and click on submit button$/, () => {
	cy.invalidLogin();
});

Then(/^User should not be able to login$/, () => {
	return true;
});



When(/^User clicks on submit button$/, () => {
	cy.blankLogin();
});

Then(/^User should not be able to login with blank fields$/, () => {
	return true;
});


