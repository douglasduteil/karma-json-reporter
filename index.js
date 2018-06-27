/* jshint node: true */

'use strict'
var path = require('path')
var fs = require('fs')
var stringify = require('json-cycle').stringify

//
var JSONReporter = function (baseReporterDecorator, config, helper, logger) {
  var log = logger.create('karma-json-reporter')
  baseReporterDecorator(this)

  var history = {
    browsers: {},
    result: {},
    summary: {}
  }

  var reporterConfig = config.jsonReporter || {}
  var stdout =
    typeof reporterConfig.stdout !== 'undefined' ? reporterConfig.stdout : true
  var outputFile = reporterConfig.outputFile
    ? helper.normalizeWinPath(
      path.resolve(config.basePath, reporterConfig.outputFile)
    )
    : null

  this.onSpecComplete = function (browser, result) {
    history.result[browser.id] = history.result[browser.id] || []
    history.result[browser.id].push(result)

    history.browsers[browser.id] = history.browsers[browser.id] || browser
  }

  this.onRunComplete = function (browser, result) {
    history.summary = result
    var json = stringify(history, undefined, '\t')

    if (stdout) {
      process.stdout.write(json)
    }

    if (outputFile) {
      helper.mkdirIfNotExists(path.dirname(outputFile), function () {
        fs.writeFile(outputFile, json, function (err) {
          if (err) {
            log.warn('Cannot write JSON\n\t' + err.message)
          } else {
            log.debug('JSON written to "%s".', outputFile)
          }
        })
      })
    } else {
      history.result = {}
    }
  }
}

JSONReporter.$inject = ['baseReporterDecorator', 'config', 'helper', 'logger']

// PUBLISH DI MODULE
module.exports = {
  'reporter:json': ['type', JSONReporter]
}
