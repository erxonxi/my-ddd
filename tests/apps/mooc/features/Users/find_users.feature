Feature: Filter Users By Criteria Feature

  Scenario: Filter All Users
    Given I send a POST request to '/users/criteria' with body:
    """
    {
      "filters": []
    }
    """
    Then the response status code should be 200

  Scenario: Filter Users By Email Contains
    Given I send a POST request to '/users/criteria' with body:
    """
    {
      "filters": [
        [
          ["field", "email"],
          ["operator","NOT_CONTAINS"],
          ["value","gmail.com"]
        ]
      ]
    }
    """
    Then the response status code should be 200
