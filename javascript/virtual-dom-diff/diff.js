/**
 * 1、节点替换
 * 2、节点删除
 * 3、节点属性修改
 * 4、文本内容修改
 * 5、节点新增
 * 6、节点顺序更改
 * ...
 * @type {Readonly<{REMOVE: number, ATTRS: number, TEXT: number, REPLACE: number}>}
 */
const DIFF_TYPE = Object.freeze({
  REPLACE: 1,   // {type: 1, tag: ?}
  REMOVE: 2,    // {type: 2, node: ?}
  ATTRS: 3,     // {type: 3, patches: [?]}
  TEXT: 4,      // {type: 4, text: ?}
});

/**
 * 1、属性删除
 * 2、属性替换
 * 3、属性新增
 * @type {Readonly<{ADD: number, REMOVE: number, REPLACE: number}>}
 */
const ATTR_DIFF_TYPE = Object.freeze({
  REMOVE: 1,    // {type: 1, attr: ?}
  REPLACE: 2,   // {type: 2, attr: ?, value: ?}
  ADD: 3,       // {type: 3, attr: ?, value: ?}
});

// 节点标识
let index = 0;

/**
 * diff
 * @param oldTree{VirtualDom}
 * @param newTree{VirtualDom}
 * @return patches{Object}
 */
function diff(oldTree, newTree) {
  // 重置节点标识
  index = 0;

  // 描述节点差异的对象
  const patches = {};

  // 对两棵树进行深度优先遍历
  walk(oldTree, newTree, index, patches);

  return patches;
}

/**
 * 对两棵树进行深度优先遍历
 * @param oldNode{VirtualDom}
 * @param newNode{VirtualDom}
 * @param index{number}
 * @param patches{Object}
 */
function walk(oldNode, newNode, index, patches) {
  const currentPatches = [];
  if (!newNode) {
    // 删除节点
    currentPatches.push({type: DIFF_TYPE.REMOVE, node: oldNode});
  } else if (typeof oldNode === 'string' && typeof newNode === 'string') {
    if (oldNode !== newNode) {
      // 文本修改
      currentPatches.push({type: DIFF_TYPE.TEXT, text: newNode});
    }
  } else {
    if (oldNode.tag !== newNode.tag) {
      // 标签替换
      currentPatches.push({type: DIFF_TYPE.REPLACE, tag: newNode.tag});
    }
    // 比较属性是否有更改
    const attrPatches = diffAttrs(oldNode.attrs, newNode.attrs);
    if (attrPatches.length) {
      currentPatches.push({
        type: DIFF_TYPE.ATTRS,
        patches: attrPatches
      })
    }
    // 递归比较children
    diffChildren(oldNode.children, newNode.children, patches);
  }

  // 当前元素确实有补丁存在
  if (currentPatches.length) {
    patches[index] = currentPatches;
  }
}

/**
 * 比较节点属性是否有变更
 * @param oldAttrs
 * @param newAttrs
 */
function diffAttrs(oldAttrs, newAttrs) {
  let attrPatches = [];

  for (let attr in oldAttrs) {
    if (oldAttrs.hasOwnProperty(attr)) {
      if (typeof newAttrs[attr] === 'undefined') {
        // TODO 删除属性
        attrPatches.push({
          type: ATTR_DIFF_TYPE.REMOVE,
          attr: attr
        });
      } else if (oldAttrs[attr] !== newAttrs[attr]) {
        // 属性值更改
        attrPatches.push({
          type: ATTR_DIFF_TYPE.REPLACE,
          attr: attr,
          value: newAttrs[attr]
        });
      }
    }
  }

  for (let attr in newAttrs) {
    if (newAttrs.hasOwnProperty(attr)) {
      if (!oldAttrs.hasOwnProperty(attr)) {
        // 属性新增
        attrPatches.push({
          type: ATTR_DIFF_TYPE.ADD,
          attr: attr,
          value: newAttrs[attr]
        });
      }
    }
  }

  return attrPatches;
}

/**
 * 比较子节点
 * @param oldChildren
 * @param newChildren
 * @param patches
 */
function diffChildren(oldChildren, newChildren, patches) {
  // TODO 变序child 需要key

  // TODO 删除child 需要key

  // TODO 新增child

  oldChildren.forEach((child, i) => {
    walk(child, newChildren[i], index++, patches);
  });
}

export {diff};
