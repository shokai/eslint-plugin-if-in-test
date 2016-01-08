var path = require("path");

module.exports = function(context){

  // the target of rule is only in test-code
  var testDir = (context.options[0] || "test");
  var testDirPattern = new RegExp(path.resolve(testDir) + "/");

  if(!testDirPattern.test(context.getFilename())) return {};

  return {
    "IfStatement": function(node){
      context.report({
        message: "\"if\" statement found. probably it is \"it\".",
        node: node
      });
    }
  }
};

module.exports.schema = {
};
