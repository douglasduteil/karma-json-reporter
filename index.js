/* jshint node: true */

'use strict';

var path = require('path');
var fs = require('fs');

var JSONReporter = function (baseReporterDecorator, config, logger, helper) {
  var log = logger.create('reporter.json');
  var reporterConfig = config.jsonReporter || {};
  var outputFile = helper.normalizeWinPath(path.resolve(config.basePath, reporterConfig.outputFile
      || 'test-results.json'));

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
    // process.stdout.write(JSON.stringify(history));

    helper.mkdirIfNotExists(path.dirname(outputFile), function() {
      fs.writeFile(outputFile, JSON.stringify(history), function(err) {
        if (err) {
          log.warn('Cannot write JSON file\n\t' + err.message);
        } else {
          log.info('JSON results written to "%s".', outputFile);
        }
      });
    });
  };
};

JSONReporter.$inject = ['baseReporterDecorator', 'config', 'logger', 'helper'];

// PUBLISH DI MODULE
module.exports = {
  'reporter:json': ['type', JSONReporter]
};
