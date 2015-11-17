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

  it('should show the sunglasses page',function(done) {
    client
      .url('http://www.wix.com/demone2/eyewear-store#!sunglasses/cuba')
      .webdrivercss(testName + '.sunglasses', {
        name: '1',
        screenWidth: selectedCaps == 'chrome' ? [1200] : undefined,
      }, resultsCallback)
      .call(done);
  });

  it('should show the optics page',function(done) {
    client
      .url('http://www.wix.com/demone2/eyewear-store#!optics/c1no')
      .webdrivercss(testName + '.optics', {
        name: '1',
        screenWidth: selectedCaps == 'chrome' ? [1200] : undefined,
      }, resultsCallback)
      .call(done);
  });

  it('should show the sale page',function(done) {
    client
      .url('http://www.wix.com/demone2/eyewear-store#!sale/c1ijr')
      .webdrivercss(testName + '.sale', {
        name: '1',
        screenWidth: selectedCaps == 'chrome' ? [1200] : undefined,
      }, resultsCallback)
      .call(done);
  });

  it('should show the join our mailing list  page',function(done) {
    client
      .url('http://shoutout.apps.wixapps.net/widget-new?cacheKiller=1447749091460&compId=comp-iemmphes&deviceType=desktop&instance=T8dxpqxIILlphorhjg1X6IkiZsMpPb66sUL2F5c5Luk.eyJpbnN0YW5jZUlkIjoiMTQwY2JjMGQtYWFjZi1iYTc3LTljOGMtZjMwMjUyNjE4ZTlkIiwic2lnbkRhdGUiOiIyMDE1LTExLTE3VDA4OjMxOjMwLjUzNVoiLCJ1aWQiOm51bGwsInBlcm1pc3Npb25zIjpudWxsLCJpcEFuZFBvcnQiOiI4NC4xMDkuOTAuODgvNjUyOTMiLCJ2ZW5kb3JQcm9kdWN0SWQiOm51bGwsImRlbW9Nb2RlIjp0cnVlLCJvcmlnaW5JbnN0YW5jZUlkIjoiMTQwYzBiZDktN2NlYy05YWU5LWI5MjMtZGYyZmUyNGQxYWRmIiwiYWlkIjoiMmFlNjc5ZGItNzM0Yi00YzAxLWFjOTQtMmRkYmUwNTI4YzY2IiwiYmlUb2tlbiI6IjM3N2VlYjExLTIwYjItZmZlMS0xZDYxLWE4YTIzYzZhNjFhOSIsInNpdGVPd25lcklkIjoiODQ3NzBmNjctZWNiZC00NGI2LWIzNWEtNTg0ZjJkYzE1YWYxIn0&locale=en&viewMode=site&width=275%22')
      .webdrivercss(testName + '.join-our-mailing-list', {
        name: '1',
        hide:
          [
            '#submit'
          ],
        screenWidth: selectedCaps == 'chrome' ? [1200] : undefined,
      }, resultsCallback)
      .call(done);
  });
});
