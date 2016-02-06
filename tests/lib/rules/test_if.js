"use strict";

var path = require("path");

var rule = require(path.resolve()).rules.if;
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
      code: "if(true){ }",
      options: [{directory: ["test", "packages/foo/test"]}], // multiple directory
      filename: path.resolve("test/foo/bar/baz.js")
    },
    {
      code: "if(true){ }",
      options: [{directory: ["test", "packages/*/test"]}], // wild card
      filename: path.resolve("packages/foo/test/bar.js")
    },
    {
      code: "describe('foo', function(){ it('should ~~', function(){  }); }); // valid mocha test",
      options: [{directory: "test"}],
      filename: path.resolve("test/foo/bar/baz.js")
    },
    {
      code: "describe('foo', function(){ if(true){ } }); // \"if-not-string\" in describe function",
      options: [{directory: "test"}],
      filename: path.resolve("test/foo/bar/baz.js")
    },
    {
      code: "if('aa'){ } describe('foo', function(){ it('should ~~', function(){  }); }); // \"if-string\" outside of describe function",
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
      code: "describe('foo', function(){ if('should ~~', function(){  }); }); // \"if-string\" in describe",
      options: [{directory: "test"}],
      errors: [{message: null, type: "IfStatement"}],
      filename: path.resolve("test/foo/bar/baz.js") // in test directory
    },
    {
      code: "describe('foo', function(){ if('should ~~', function(){  }); }); // \"if-string\" in describe",
      options: [{directory: ["test", "packages/foo/test"]}], // multiple directory
      errors: [{message: null, type: "IfStatement"}],
      filename: path.resolve("packages/foo/test/bar.js")
    },
    {
      code: "describe('foo', function(){ if('should ~~', function(){  }); }); // \"if-string\" in describe",
      options: [{directory: ["test", "packages/*/test"]}], // wildcard
      errors: [{message: null, type: "IfStatement"}],
      filename: path.resolve("packages/foo/test/bar.js")
    },
    {
      code: "describe('foo', function(){ it('should ~~', function(){  if('should ~~', function(){  }); }); }); // \"if-string\" in describe",
      options: [{directory: "test"}],
      errors: [{message: null, type: "IfStatement"}],
      filename: path.resolve("test/foo/bar/baz.js") // in test directory
    },
    {
      code: "describe('foo', function(){ describe('bar', function(){  if('should ~~', function(){  }); }); }); // \"if-string\" in 2 describes",
      options: [{directory: "test"}],
      errors: [{message: null, type: "IfStatement"}],
      filename: path.resolve("test/foo/bar/baz.js") // in test directory
    }
  ]
});
