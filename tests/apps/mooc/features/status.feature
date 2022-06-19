Feature: API Status
  Scenario: Check API Status
    Given I send a GET request to "/status"
    Then the response status code should be 200