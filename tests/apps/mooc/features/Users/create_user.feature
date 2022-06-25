Feature: Create User Feature
  Scenario: Create Valid User
    Given I send a PUT request to "/users/6281e1e4-4be1-4c3e-a4c6-ceda77001d6f" with body:
    """
    {
      "name": "Alfredo",
      "email": "alfredo@gmail.com",
      "password": "superpassword"
    }
    """
    Then the response status code should be 201
