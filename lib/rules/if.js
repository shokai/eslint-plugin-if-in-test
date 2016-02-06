"use strict";

var path = require("path");
var chalk = require("chalk");

module.exports = function(context){

  // target of is only in test-code
  var testDir = path.resolve(context.options[0].directory);
  var testDirPattern = new RegExp("^" + testDir + "/");
  if(!testDirPattern.test(context.getFilename())) return {};

  // in test-code
  var describeCallCount = 0;
  return {
    "CallExpression": function(node){
      if(node.callee.name === "describe") describeCallCount += 1;
    },
    "CallExpression:exit": function(node){
      if(node.callee.name === "describe") describeCallCount -= 1;
    },
    "IfStatement": function(node){
      if(describeCallCount < 1) return;
      if(node.test.type !== "SequenceExpression") return;

      // inside of "describe" function
      var code = context.getSourceCode().getText(node).slice(0, 15) + "~~~";
      context.report({
        node: node,
        message: code.replace(/^if/, chalk.bold.underline('if'))
          + "  is probably typo of "
          + code.replace(/^if/, chalk.bold.underline('it'))
      });
    }
  }
};

// validator for .eslint
module.exports.schema = [
  {
    type: "object",
    properties: {
      directory: {
        type: "string"
      }
    },
    additionalProperties: false
  }
];
