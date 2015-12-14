Feature: manage store
  The ability to click on the manage store link
  As an registered user
  We can see that we are getting an 404 when we click on the manage store link .

  @javascript @wip
  Scenario: Visit the e commerce page
    Given I login with user
    When   I click the Manage Store
    Then  I should not see the error message "HTTP ERROR 404"
