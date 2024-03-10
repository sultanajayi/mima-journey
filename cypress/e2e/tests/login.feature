Feature: Testing all login Scenarios
    As a user,
    I should be able to login

    Background:
        Given User is on the login page

  Scenario: A User should be able to login with valid details
    When User clicks on the login button
    And User enters email,password and click on submit button
    Then User should be able to login


Scenario: A User should not be able to login with invalid details
    When User clicks on the login button
    And User enters email,invalid password and click on submit button
    Then User should not be able to login

Scenario: A User should not be able to login with blank fields
    When User clicks on the login button
    And  User clicks on submit button
    Then User should not be able to login with blank fields