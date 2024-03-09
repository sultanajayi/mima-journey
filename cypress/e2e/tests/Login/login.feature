Feature : Testing all login Scenarios
    As a user,
    I want to be able to login to the application
    So that I can use the application

    Scenario : Login with valid credentials
    Given I am on the login page
    And I enter my email and password
    And I click the login button
    Then I should be redirected to the dashboard page

   