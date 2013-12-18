/* jshint node: true */

'use strict';

var JSONReporter = function (baseReporterDecorator) {
  baseReporterDecorator(this);

  var onSpecCompleteOriginal = this.onSpecComplete;

  this.onSpecComplete = function(browser, result) {
    var status;

    if (result.success) {
      status = 'SUCCESS';
    }
    else if (result.skipped) {
      status = 'SKIPPED';
    }
    else {
      status = 'FAILURE';
    }

    process.stdout.write(JSON.stringify([status, {
      description : result.suite.join(' ') + ' ' + result.description
    }]));

    onSpecCompleteOriginal.call(this, browser, result);
  };
};

JSONReporter.$inject = ['baseReporterDecorator'];

// PUBLISH DI MODULE
module.exports = {
  'reporter:json': ['type', JSONReporter]
};
