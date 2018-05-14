let list = [];
let labelList = [];

function getChild(node, val) {
  node.map(v => {
    if (v.children && (v.id == val.id)) {
      list = v.children
      return
    }
    if (v.children && v.children.length > 0) {
      getChild(v.children, val);
      return;
    }
  })
}

// 获取区域
function getLabel(node, val) {
  node.map(v => {
    if (v.nodeType == 3 && (v.shortLabel.indexOf(val)>-1)) {
      labelList.push(v)
    }
    if (v.children && v.children.length > 0) {
      getLabel(v.children, val);
      return;
    }
  })
}

export function getNextNod(node, val) {
  list = [];
  getChild(node, val);
  return list
}

export function getShortName(node, name) {
  labelList = [];
  getLabel(node,name)
  return labelList
}
