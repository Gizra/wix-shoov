Feature: PRODUCT
  The ability to choose a product from the list
  As an anonymous user
  We can see the selected product.

  @javascript
  Scenario: Visit the christina sun products page
    Given I am an anonymous user
    When  I visit christina sun homepage
    And   I click on the sale button
    Then  I should see the text "I'm a product"
