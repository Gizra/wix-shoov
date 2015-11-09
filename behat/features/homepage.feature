Feature: Poll
  In order to be able to take part in the poll
  As an anonymous user
  We need to be able to submit an option.

  @javascript
  Scenario: Visit the rio page
    Given I am an anonymous user
    When  I visit rio homepage
    Then  I select an option
    Then  I should see the text "Thank you for your submission!" message

#  @javascript
#  Scenario: Visit the press page
#    Given I am an anonymous user
#    When  I visit press homepage
#    Then  I select an option
#    Then  I should see the text "Thank you for your submission!" message
