# eslint-plugin-if-in-test

find `if` statement in test code. `if` is usually not necessary in test, and it is typo of `it`.

![screen shot](https://gyazo.com/c87aa435b0ed458b24d9eceb51a9995c.png)


- https://github.com/shokai/eslint-plugin-if-in-test
- https://npmjs.com/package/eslint-plugin-if-in-test

[![Circle CI](https://circleci.com/gh/shokai/eslint-plugin-if-in-test.svg?style=svg)](https://circleci.com/gh/shokai/eslint-plugin-if-in-test)

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-if-in-test`:

```
$ npm install eslint-plugin-if-in-test --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-if-in-test` globally.

## Usage

Add `if-in-test` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "if-in-test"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "if-in-test/if": [1, {"directory": "test"}]
    }
}
```

## Supported Rules

* if
  * find `if` statement
  * `[1, {"directory": "test"}]` - warn `if` statement in `test/` directory.





