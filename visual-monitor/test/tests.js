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
      .url('http://ecom.wix.com/storefront/gallery?cacheKiller=1447760509572&compId=i98dt4wo&deviceType=desktop&instance=vbEUUwRCo74EW9pjyoBoh54do1K-diiBS2bsIYvEDq0.eyJpbnN0YW5jZUlkIjoiOTZkNzY5Y2ItZmI3OS00YjZjLTkyNTktYzI5MGZlZWVlYWM1Iiwic2lnbkRhdGUiOiIyMDE1LTExLTE3VDExOjQxOjQ5LjAxN1oiLCJ1aWQiOm51bGwsInBlcm1pc3Npb25zIjpudWxsLCJpcEFuZFBvcnQiOiI4NC4xMDkuOTAuODgvNDI4MDQiLCJ2ZW5kb3JQcm9kdWN0SWQiOm51bGwsImRlbW9Nb2RlIjp0cnVlLCJvcmlnaW5JbnN0YW5jZUlkIjoiMzk3YzZhYTUtNWVmZi00NzEzLWEwYzItOTI1ZDIwYzY4YjU0IiwiYWlkIjoiYmU2YThiZjEtMTc3Zi00ZjNkLTgxMmMtYzFhYjNjMTI1MWU2IiwiYmlUb2tlbiI6ImE4MmExNTczLWI4YzQtMGIwMS0zNmNhLTY2MWQwNWRjYzMwMyIsInNpdGVPd25lcklkIjoiODQ3NzBmNjctZWNiZC00NGI2LWIzNWEtNTg0ZjJkYzE1YWYxIn0&locale=en&viewMode=site&width=978')
      .click('body > div > div > section ul li:nth-child(1) div .product-media')
      .webdrivercss(testName + '.sunglasses', {
        name: '1',
        screenWidth: selectedCaps == 'chrome' ? [1200] : undefined,
      }, resultsCallback)
      .call(done);
  });

  it('should show the optics page',function(done) {
    client
      .url('http://ecom.wix.com/storefront/gallery?cacheKiller=1447763757014&compId=i98dgyxs_0&deviceType=desktop&instance=b0yo2osTrF4B9UoV2YBITWQJRoVi6Vubstlk8F5ekdU.eyJpbnN0YW5jZUlkIjoiOTZkNzY5Y2ItZmI3OS00YjZjLTkyNTktYzI5MGZlZWVlYWM1Iiwic2lnbkRhdGUiOiIyMDE1LTExLTE3VDEyOjM1OjU1LjQyNloiLCJ1aWQiOm51bGwsInBlcm1pc3Npb25zIjpudWxsLCJpcEFuZFBvcnQiOiI4NC4xMDkuOTAuODgvNDQzOTAiLCJ2ZW5kb3JQcm9kdWN0SWQiOm51bGwsImRlbW9Nb2RlIjp0cnVlLCJvcmlnaW5JbnN0YW5jZUlkIjoiMzk3YzZhYTUtNWVmZi00NzEzLWEwYzItOTI1ZDIwYzY4YjU0IiwiYWlkIjoiYzA4NmRkZjgtMTNhOS00MzRkLWFkOTUtMGRkOGQ0ZmRkZjllIiwiYmlUb2tlbiI6ImE4MmExNTczLWI4YzQtMGIwMS0zNmNhLTY2MWQwNWRjYzMwMyIsInNpdGVPd25lcklkIjoiODQ3NzBmNjctZWNiZC00NGI2LWIzNWEtNTg0ZjJkYzE1YWYxIn0&locale=en&section-url=http%3A%2F%2Fwww.wix.com%2Fdemone2%2Feyewear-store%23!optics%2Fc1no%2F&target=_top&viewMode=site&width=979')
      .webdrivercss(testName + '.optics', {
        name: '1',
        screenWidth: selectedCaps == 'chrome' ? [1200] : undefined,
      }, resultsCallback)
      .call(done);
  });

  it('should show the sale page',function(done) {
    client
      .url('http://ecom.wix.com/storefront/gallery?cacheKiller=1447765722287&compId=i9l9184x&deviceType=desktop&instance=MJpy9KGxMD2mKWOpajuI6qITwaN8tWnXUTenGtlVusg.eyJpbnN0YW5jZUlkIjoiOTZkNzY5Y2ItZmI3OS00YjZjLTkyNTktYzI5MGZlZWVlYWM1Iiwic2lnbkRhdGUiOiIyMDE1LTExLTE3VDEzOjA4OjQxLjUxMFoiLCJ1aWQiOm51bGwsInBlcm1pc3Npb25zIjpudWxsLCJpcEFuZFBvcnQiOiI4NC4xMDkuOTAuODgvMzM0NjkiLCJ2ZW5kb3JQcm9kdWN0SWQiOm51bGwsImRlbW9Nb2RlIjp0cnVlLCJvcmlnaW5JbnN0YW5jZUlkIjoiMzk3YzZhYTUtNWVmZi00NzEzLWEwYzItOTI1ZDIwYzY4YjU0IiwiYWlkIjoiNmM4MzQ0NmMtZTIxMC00M2NjLTk4NDEtMjU3OWE1YjNmNTA3IiwiYmlUb2tlbiI6ImE4MmExNTczLWI4YzQtMGIwMS0zNmNhLTY2MWQwNWRjYzMwMyIsInNpdGVPd25lcklkIjoiODQ3NzBmNjctZWNiZC00NGI2LWIzNWEtNTg0ZjJkYzE1YWYxIn0&locale=en&viewMode=site&width=980')
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
            '#submit',
          ],
        screenWidth: selectedCaps == 'chrome' ? [1200] : undefined,
      }, resultsCallback)
      .call(done);
  });

  it('should show the media player',function(done) {
    client
      .url('http://www.wix.com/demone2/indie-folk')
      .pause(10000)
      .webdrivercss(testName + '.media-player', {
        name: '1',
        elem:
          [
            '#icxcxffq'
          ],
        screenWidth: selectedCaps == 'chrome' ? [1200] : undefined,
      }, resultsCallback)
      .call(done);
  });

});
