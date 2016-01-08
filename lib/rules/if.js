var path = require("path");
var chalk = require("chalk");

module.exports = function(context){

  // the target of rule is only in test-code
  var testDir = (context.options[0] || "test");
  var testDirPattern = new RegExp(path.resolve(testDir) + "/");

  if(!testDirPattern.test(context.getFilename())) return {};

  return {
    "IfStatement": function(node){
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

module.exports.schema = {
};