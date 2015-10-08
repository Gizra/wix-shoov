'use strict';

var shoovWebdrivercss = require('shoov-webdrivercss');

// This can be executed by passing the environment argument like this:
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=chrome mocha
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=ie11 mocha
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=iphone5 mocha

var capsConfig = {
  'chrome': {
    'browser' : 'Chrome',
    'browser_version' : '42.0',
    'os' : 'OS X',
    'os_version' : 'Yosemite',
    'resolution' : '1024x768'
  },
  'ie11': {
    'browser' : 'IE',
    'browser_version' : '11.0',
    'os' : 'Windows',
    'os_version' : '7',
    'resolution' : '1024x768'
  }
};

var selectedCaps = process.env.SELECTED_CAPS || undefined;
var caps = selectedCaps ? capsConfig[selectedCaps] : undefined;

var providerPrefix = process.env.PROVIDER_PREFIX ? process.env.PROVIDER_PREFIX + '-' : '';
var testName = selectedCaps ? providerPrefix + selectedCaps : providerPrefix + 'default';

var baseUrl = process.env.BASE_URL ? process.env.BASE_URL : 'http://server2.web-stat.com/wixCurrencyPreview.pl';

var resultsCallback = process.env.DEBUG ? console.log : shoovWebdrivercss.processResults;

describe('Visual monitor testing', function() {

  this.timeout(99999999);
  var client = {};

  before(function(done){
    client = shoovWebdrivercss.before(done, caps);
  });

  after(function(done) {
    shoovWebdrivercss.after(done);
  });

  it('should show the Currency Preview page',function(done) {
    client
      .url('http://server2.web-stat.com/wixCurrencyPreview.pl')
      .webdrivercss(testName + '.currency-preview', {
        name: '1',
        exclude:
          [
            // Currency text.
            '#amt2',
            // Currency result.
            '#result',
          ],
        screenWidth: selectedCaps == 'chrome' ? [960] : undefined,
      }, resultsCallback)
      .call(done);
  });

  it('should show the about page',function(done) {
    client
      .url('http://www.wix.com/demone2/boutique-recruitment-agency#!about/cjg9')
      .webdrivercss(testName + '.about', {
        name: '1',
        exclude:
          [
            // Team images.
            '#cjg9inlineContent #WPht0-17knimg',
            '#cjg9inlineContent #WPht3-1549imgimage',
          ],
        screenWidth: selectedCaps == 'chrome' ? [960] : undefined,
      }, resultsCallback)
      .call(done);
  });
});
