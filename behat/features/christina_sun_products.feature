Feature: PRODUCT
  The ability to choose a product color from the list
  As an anonymous user
  We can see the selected product.

  @javascript
  Scenario: Visit the christina sun products page
    Given   I am an anonymous user
    When    I visit in christina sun product page
    Then    I should pick a color
    And     I click on the add to cart button
