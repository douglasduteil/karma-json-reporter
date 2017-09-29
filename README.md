# karma-json-reporter 

 [![Build Status](https://travis-ci.org/douglasduteil/karma-json-reporter.svg?branch=master)](https://travis-ci.org/douglasduteil/karma-json-reporter)
 [![npm](https://img.shields.io/npm/v/karma-json-reporter.svg)](https://www.npmjs.com/package/karma-spec-json-reporter)
 [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> JSON reporter for Karma


## Installation

The easiest way is to keep `karma-json-reporter` as a devDependency in your `package.json`.

```json
{
  "devDependencies": {
    "karma": "~0.10",
    "karma-json-reporter": "~1.1"
  }
}
```

You can simple do it by:
```bash
npm install karma-json-reporter --save-dev
```

## Usage

Use it as a reporter

```js
// karma.conf.js
module.exports = function(config) {
  // ...

    // json reporter directly output stringified json
    reporters: ['json'],
    jsonReporter: {
      stdout: true,
      outputFile: 'results.json' // defaults to none
    }

  // ...
};
```

## Output data


```js
{
  "browsers": { // Collection of used browser
    "<browser.id>": {
      "id": "<same browser.id>",
      "fullName": String,
      "name": String,
      "state": Number,
      "lastResult": {
        "success":Number,
        "failed": Number,
        "skipped": Number,
        "total": Number,
        "totalTime": Number,
        "netTime":Number,
        "error": Boolean,
        "disconnected": Boolean
      },
      "launchId": Number
    }
  },
  "result": { // Collection result per browser
    "<browser.id>": [
      {
        "id": Number, // spec.id
        "description": String, // spec.description
        "suite": Array.of(String), // spec.suite
        "success": Boolean,
        "skipped": Boolean,
        "time": Number,
        "log": Array.of(String), // spec.log
      },
    ]
  },
  "summary": {
    "success": Number, // total number of success
    "failed": Number, // total number of fail
    "error": Boolean,
    "disconnected": Boolean,
    "exitCode": Number
  }
}
```

[Output example](https://gist.github.com/douglasduteil/8039664)
