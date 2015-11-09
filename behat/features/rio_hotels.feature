Feature: Rio hotels rooms
  In order to be able to select a deadline
  As an anonymous user
  We need to be able to see rooms available.

  @javascript
  Scenario: Visit the rio hotels page
    Given I am an anonymous user
    When  I visit rio hotels homepage
    Then  I Selects term stay
    And   I click on the search button
    And   I should see the text "Our Rooms"
