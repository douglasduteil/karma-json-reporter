/* jshint node: true */

'use strict';

//
var JSONReporter = function (baseReporterDecorator) {
  baseReporterDecorator(this);

  var history = {
    browsers : {},
    result : {},
    summary : {}
  };

  this.onSpecComplete = function(browser, result) {
    history.result[browser.id] = history.result[browser.id] || [];
    history.result[browser.id].push(result);

    history.browsers[browser.id] = history.browsers[browser.id] || browser;
  };

  this.onRunComplete = function(browser, result) {
    history.summary = result;
    process.stdout.write(JSON.stringify(history));
  };
};

JSONReporter.$inject = ['baseReporterDecorator'];

// PUBLISH DI MODULE
module.exports = {
  'reporter:json': ['type', JSONReporter]
};
