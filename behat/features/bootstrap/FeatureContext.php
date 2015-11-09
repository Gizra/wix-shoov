<?php

use Drupal\DrupalExtension\Context\MinkContext;
use Behat\Behat\Context\SnippetAcceptingContext;
use Behat\Gherkin\Node\PyStringNode;
use Behat\Gherkin\Node\TableNode;
use Behat\Behat\Tester\Exception\PendingException;

class FeatureContext extends MinkContext implements SnippetAcceptingContext {

  /**
   * @Given I am an anonymous user
   */
  public function iAmAnAnonymousUser() {
    // Just let this pass-through.
  }

  /**
   * @When I visit the homepage
   */
  public function iVisitTheHomepage() {
    $this->getSession()->visit($this->locatePath('/'));
  }

  /**
   * @Then I should have access to the page
   */
  public function iShouldHaveAccessToThePage() {
    $this->assertSession()->statusCodeEquals('200');
  }

  /**
   * @Then I should not have access to the page
   */
  public function iShouldNotHaveAccessToThePage() {
    $this->assertSession()->statusCodeEquals('403');
  }

  /**
   * @Then I select an option
   */
  public function iSelectAnOption() {
    $this->iWaitForCssElement('.dynamicElements');

    $element = $this->getSession()->getPage()->find('css', 'input[name="(Radio 3)"]');
    $element->click();

    // Make sure bot detection is not activated.
    $this->getSession()->wait(1000);

    $button = $this->getSession()->getPage()->find('css', '#submitButton');
    $button->click();
  }

  /**
   * @Then I should see the text :text message
   */
  public function iShouldSeeTheTextMessage($text) {
    $this->iWaitForCssElement('.success');
    $this->assertPageContainsText($text);
    $this->getSession()->wait(1000);
  }


  /**
   * @Then I should wait for the text :arg1 to :arg2
   */
  public function iShouldWaitForTheTextTo($text, $appear) {
    $this->waitForXpathNode(".//*[contains(normalize-space(string(text())), \"$text\")]", $appear == 'appear');
  }

  /**
   * @Then /^I wait for css element "([^"]*)" to "([^"]*)"$/
   */
  public function iWaitForCssElement($element, $appear = 'appear') {
    $xpath = $this->getSession()->getSelectorsHandler()->selectorToXpath('css', $element);
    $this->waitForXpathNode($xpath, $appear == 'appear');
  }

  /**
   * Helper function; Execute a function until it return TRUE or timeouts.
   *
   * @param $fn
   *   A callable to invoke.
   * @param int $timeout
   *   The timeout period. Defaults to 10 seconds.
   *
   * @throws Exception
   */
  private function waitFor($fn, $timeout = 15000) {
    $start = microtime(true);
    $end = $start + $timeout / 1000.0;
    while (microtime(true) < $end) {
      if ($fn($this)) {
        return;
      }
    }
    throw new \Exception('waitFor timed out.');
  }

  /**
   * Wait for an element by its XPath to appear or disappear.
   *
   * @param string $xpath
   *   The XPath string.
   * @param bool $appear
   *   Determine if element should appear. Defaults to TRUE.
   *
   * @throws Exception
   */
  private function waitForXpathNode($xpath, $appear = TRUE) {
    $this->waitFor(function($context) use ($xpath, $appear) {
      try {
        $nodes = $context->getSession()->getDriver()->find($xpath);
        if (count($nodes) > 0) {
          $visible = $nodes[0]->isVisible();
          return $appear ? $visible : !$visible;
        }
        return !$appear;
      }
      catch (WebDriver\Exception $e) {
        if ($e->getCode() == WebDriver\Exception::NO_SUCH_ELEMENT) {
          return !$appear;
        }
        throw $e;
      }
    });
  }

  /**
   * @When I visit christina sun homepage
   */
  public function iVisitChristinaSunHomepage()
  {
    $this->getSession()->visit('http://www.wix.com/demone2/eyewear-store#!sale/c1ijr');
  }

  /**
   * @When I click on the sale button
   */
  public function iClickOnTheSaleButton() {
    // The product id IFrame.
    $id_iframe = 'i9l9184xiframe';
    // The products list.
    $productsPage = $this->getSession();
    // Waiting for the page to load.
    sleep(6);

    if (!empty($productsPage)) {
      // Switch to IFrame.
      $this->moveToIFrame($productsPage, $id_iframe);
    }

    // Find the product button.
    $productButton = $productsPage->getPage()->find("css", ".device-desktop .gallery .product-media-container .product-media .ribbon");
    if (!$productButton) {
      throw new \Exception('The button was not found');
    }
    $productButton->click();
  }

  /**
   * @When I visit rio hotels homepage
   */
  public function iVisitRioHotelsHomepage()
  {
    $this->getSession()->visit('http://www.wix.com/website-template/view/html/1710');
  }

  /**
   * @Then I Selects term stay
   */
  public function iSelectsTermStay()
  {
    // The form id IFrame.
    $id_iframe = 'comp-iemgbo3kiframe';
    // The products list.
    $homePage = $this->getSession();
    // Waiting for the page to load.
    sleep(10);

    if (!empty($homePage)) {
      // Switch to IFrame.
      $this->moveToIFrame($homePage, $id_iframe);
    }
  }

  /**
   * @Then I click on the search button
   */
  public function iClickOnTheSearchButton()
  {
    throw new PendingException();
  }


  /**
   * @When I visit press homepage
   */
  public function iVisitPressHomepage()
  {
    $this->getSession()->visit('http://www.wix.com/demone2/indie-folk#!press/c15e9');
  }

  /**
   * @Given /^I click \("\[\^"\]\+"\|'\[\^'\]\+'\|\\w\+\(\[\.,\]\\w\+\)\)$/
   */
  public function iClickWW($arg1, $arg2)
  {
    throw new PendingException();
  }

  /**
   * Switch to IFrame.
   *
   * @param $session, current page object
   * @param $id, IFrame id
   */
  public function moveToIFrame($session, $id) {
    $session->switchToIFrame($id);
  }

}
