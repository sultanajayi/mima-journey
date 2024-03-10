import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"


Given(/^I am on the login page$/, () => {
	cy.visit('/');
});

When(/^I click on the login button$/, () => {
	return true;
});

When(/^I enter my email and password$/, () => {
	return true;
});

When(/^I click on the submit button$/, () => {
	return true;
});

Then(/^I should be able to login$/, () => {
	return true;
});

