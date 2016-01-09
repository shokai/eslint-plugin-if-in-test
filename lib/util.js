function findParentNode(node, targetPattern){
  var parent = node.parent;
  if(!parent) return null;
  if(matchNode(parent, targetPattern)) return parent;
  return arguments.callee(parent, targetPattern);
};

function matchNode(node, pattern){
  for(var k in pattern){
    var v = pattern[k];
    if(typeof v === "object"){
      if(!arguments.callee(node[k], v)) return false;
    }
    else{
      if(v !== node[k]) return false;
    }
  }
  return true;
}

module.exports = {
  findParentNode: findParentNode,
  matchNode: matchNode
};

