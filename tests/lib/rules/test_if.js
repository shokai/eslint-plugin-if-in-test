var path = require("path");

var rule = require("../../../lib/rules/if")
var RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester();
ruleTester.run("rule \"if\"", rule, {
  valid: [
    {
      code: "var foo = 'bar';",
      options: [{directory: "test"}]
    },
    {
      code: "if(true){ }",
      options: [{directory: "test"}],
      filename: path.resolve("src/foo/bar/baz.js") // out-side of test directory
    }
  ],
  invalid: [
    {
      code: "if(true){ }",
      options: [{directory: "test"}],
      errors: [{message: null, type: "IfStatement"}],
      filename: path.resolve("test/foo/bar/baz.js") // in test directory
    }
  ]
});
