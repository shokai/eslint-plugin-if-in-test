var path = require("path");
var chalk = require("chalk");
var util = require("../util");

module.exports = function(context){

  // the target of this rule is only in test-code
  var testDir = path.resolve(context.options[0].directory);
  var testDirPattern = new RegExp("^" + testDir + "/");
  if(!testDirPattern.test(context.getFilename())) return {};

  // "if" statement in test-code
  return {
    "IfStatement": function(node){
      var parent = util.findParentNode(node, {
        type: "CallExpression", callee: {name: "describe"}
      });
      if(!parent) return;

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
