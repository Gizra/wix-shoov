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
    sleep(3);
  }

  /**
   * @When I visit in christina sun product page
   */
  public function iVisitInChristinaSunProductPage()
  {
    $this->getSession()->visit('http://www.wix.com/demone2/eyewear-store#!product-page/c1pj6/2962f550-2ed9-339f-b54f-aa53c100507d');
  }


  /**
   * @Then I should pick a color"
   */
  public function iShouldPickAColor()
  {
    // The product id IFrame.
    $id_iframe = 'i98dgzdiiframe';
    // The product page.
    $productPage = $this->getSession();
    // Waiting for the page to load.
    sleep(5);

    if (!empty($productPage)) {
      // Switch to IFrame.
      $this->moveToIFrame($productPage, $id_iframe);
    }

    // Color element.
    $color_selected =  $productPage->getPage()->find("css", ".option-colors .option-color .ng-valid");
    sleep(3);

    if (!$color_selected) {
      throw new \Exception('The color not selected');
    }

    $color_selected->click();
    sleep(2);
  }

  /**
   * @Then I click on the add to cart button
   */
  public function iClickOnTheAddToCartButton() {

    // Find the add to cart element.
    $add_to_cart_button = $this->getSession()->getPage()->find("css", ".button-add-to-cart");

    if (!$add_to_cart_button) {
      throw new \Exception('The button not selected');
    }

    $add_to_cart_button->click();
    sleep(5);
  }


  /**
   * @When I visit press homepage
   */
  public function iVisitPressHomepage()
  {
    $this->getSession()->visit('http://www.wix.com/demone2/indie-folk#!press/c15e9');
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

  /**
   * @Given I login with user
   */
  public function iLoginWithUser() {
    $this->loginUser('david@gizra.com', 'a7823s3h');
  }

  /**
   * Login a user to the site.
   *
   * @param $name
   *   The user name.
   * @param $password
   *   The use password.
   *
   * @throws \Behat\Mink\Exception\ElementNotFoundException
   * @throws \Exception
   */
  protected function loginUser($name, $password) {
    $this->_login($name, $password);
    // Wait for the dashboard's menu to load.
    $this->iWaitForCssElement('.sidebar-items-container', 'appear');
  }

  /**
   * Login a user to the site.
   *
   * @param $name
   *   The user name.
   * @param $password
   *   The use password.
   *
   * @throws \Behat\Mink\Exception\ElementNotFoundException
   * @throws \Exception
   */
  private function _login($name, $password) {
    $this->getSession()->visit('https://www.wix.com/signin?postLogin=http%3A%2F%2Fwww.wix.com%2Fmy-account%2Fsites%2Fa645266b-51ea-47fd-bd2c-c3f26ab96e8d&originUrl=http%3A%2F%2Fwww.wix.com%2Fmy-account%2Fsites%2Fa645266b-51ea-47fd-bd2c-c3f26ab96e8d&overrideLocale=en');
    $element = $this->getSession()->getPage();
    sleep(5);
    $user_name = $element->find('css','#login-input-email');
    $user_name->setValue($name);
    $my_password = $element->find('css', '#login-input-password');
    $my_password ->setValue($password);
    $submit = $element->findButton('GO');
    if (empty($submit)) {
      throw new \Exception(sprintf("No submit button at %s", $this->getSession()->getCurrentUrl()));
    }
    // Log in.
    $submit->click();
  }

  /**
   * @Given /^I click on the element with css "([^"]*)"$/
   */
  public function iClickOnTheElementWithCss($css_path) {
      if (!$element = $this->getSession()->getPage()->find('css', $css_path)) {
          throw new \Exception(sprintf('The element "%s" not found.', $css_path));
    }
    $element->click();
  }

  /**
   * @When I click the Manage Store
   */
  public function iClickTheManageStore() {
    $page = $this->getSession()->getPage();
    $manage_store = $page->find('css', '.QA_ecommerce');
    $manage_store->click();
  }

  /**
   * @Then I should not see the error message :arg1
   */
  public function iShouldNotSeeTheErrorMessage($arg1) {
    
  }


}
