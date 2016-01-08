# eslint-plugin-if-in-test

find "if" statement in test code. "if" is usually not necessary in test and it is miss spell of "it".

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
        "if-in-test/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here




