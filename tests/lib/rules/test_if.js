var path = require("path");

var rule = require("../../../lib/rules/if")
var RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester();
ruleTester.run("rule \"if\"", rule, {
  valid: [
    {
      code: "if(true){ }",
      options: [{directory: "test"}],
      filename: path.resolve("test/foo/bar/baz.js") // inside of test directory
    },
    {
      code: "describe('foo', function(){ it('should ~~', function(){  }); }); // valid mocha test",
      options: [{directory: "test"}],
      filename: path.resolve("test/foo/bar/baz.js")
    },
    {
      code: "describe('foo', function(){ if('should ~~', function(){  }); }); // invalid test but outside of test directory",
      options: [{directory: "test"}],
      filename: path.resolve("src/foo/bar/baz.js")
    }
  ],
  invalid: [
    {
      code: "describe('foo', function(){ if('should ~~', function(){  }); }); // \"if\" in describe",
      options: [{directory: "test"}],
      errors: [{message: null, type: "IfStatement"}],
      filename: path.resolve("test/foo/bar/baz.js") // in test directory
    },
    {
      code: "describe('foo', function(){ it('should ~~', function(){  if('should ~~', function(){  }); }); }); // \"if\" in describe",
      options: [{directory: "test"}],
      errors: [{message: null, type: "IfStatement"}],
      filename: path.resolve("test/foo/bar/baz.js") // in test directory
    }
  ]
});
