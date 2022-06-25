Feature: Delete User Feature
  Scenario: Delete Existent User
    Given I send a DELETE request to '/users/6281e1e4-4be1-4c3e-a4c6-ceda77001d6f'
    Then the response status code should be 200
