karma-json-reporter
===================

> JSON reporter for Karma

**WORK IN PROGRESS**

## Installation

The easiest way is to keep `karma-json-reporter` as a devDependency in your `package.json`.

```json
{
  "devDependencies": {
    "karma": "~0.10",
    "karma-json-reporter": "~0.1"
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

  // ...
};
```

## Output exemple

```
["SUCCESS",{"description":"sqrt should compute the square root of 4 as 2"}]
["SUCCESS",{"description":"sqrt should compute the square root of 4 as 2"}]
["SUCCESS",{"description":"sqrt should compute the square root of 4 as 2"}]
["FAILURE",{"description":"sqrt should compute the square root of 4 as 2"}]
TOTAL: 3 SUCCESS
```
