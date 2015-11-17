Feature: From the press
  In order to be able to take part in the press
  As an anonymous user
  We need to be able to see articles.


  @javascript
  Scenario Outline: Visit the press page
    Given I am an anonymous user
    When  I visit press homepage
    Then  I should see the text "<title>"
    And   I should see the text "<paragraph>"

    Examples:
      | title                                         | paragraph                                     |
      |  The Silent South announce world tour dates   |  I'm a paragraph.                             |
      |  A psychedelic roller coaster                 |  Click here to add your own text and edit me  |
      |  This album will keep fans guessing           |  It’s easy. Just click                        |
      |  4 Stars for the new EP                       |  make changes to the font.                    |
