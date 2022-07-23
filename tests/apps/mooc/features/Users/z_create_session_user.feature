Feature: Create Session User Feature
  Scenario: Create Session Valid User
    Given I send a POST request to "/users/session" with body:
    """
    {
      "email": "alfredo2@gmail.com",
      "password": "superpassword"
    }
    """
    Then the response status code should be 200
