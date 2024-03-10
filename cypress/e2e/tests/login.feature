Feature: Testing all login Scenarios
    As a user,
    I should be able to login

  Scenario: A User should be able to login with valid details
    Given I am on the login page
    When I click on the login button
    And I enter my email and password
    And I click on the submit button
    Then I should be able to login
