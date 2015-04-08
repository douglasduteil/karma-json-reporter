/* jshint node: true */

'use strict';
var path = require('path');
var fs = require('fs');

//
var JSONReporter = function (baseReporterDecorator, config, helper) {

  baseReporterDecorator(this);

  var history = {
    browsers : {},
    result : {},
    summary : {}
  };

  var reporterConfig = config.jsonReporter || {};
  var stdout = reporterConfig.stdout || true;
  var outputFile = (reporterConfig.outputFile) ? helper.normalizeWinPath(path.resolve(config.basePath, reporterConfig.outputFile )) : null;

  this.onSpecComplete = function(browser, result) {
    history.result[browser.id] = history.result[browser.id] || [];
    history.result[browser.id].push(result);

    history.browsers[browser.id] = history.browsers[browser.id] || browser;
  };

  this.onRunComplete = function(browser, result) {
    history.summary = result;
    if(stdout) process.stdout.write(JSON.stringify(history));
    if(outputFile) {
      helper.mkdirIfNotExists(path.dirname(outputFile), function() {
      fs.writeFile(outputFile, JSON.stringify(history), function(err) {
        if (err) {
          console.log('Cannot write JSON\n\t' + err.message);
        } else {
          console.log('JSON written to "%s".', outputFile);
        }
        history.result = {};
      });
    });
    }
  };
};

JSONReporter.$inject = ['baseReporterDecorator','config','helper'];

// PUBLISH DI MODULE
module.exports = {
  'reporter:json': ['type', JSONReporter]
};
