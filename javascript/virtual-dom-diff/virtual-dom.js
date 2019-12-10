/**
 * 参考
 * https://github.com/livoras/blog/issues/13
 * https://juejin.im/post/5c8e5e4951882545c109ae9c
 */

class VirtualDom {
  /**
   * @param tag{string} 标签名
   * @param attrs{Object} 属性
   * @param children{Array<VirtualDom | string>} 子元素
   */
  constructor(tag, attrs, children) {
    this.tag = tag;
    this.attrs = attrs;
    this.children = children;
  }
}

/**
 * 创建VirtualDom
 * @param tag{string} 标签名
 * @param attrs{Object} 属性
 * @param children{Array<VirtualDom | string>} 子元素
 * @returns {VirtualDom}
 */
function createVirtualDom(tag, attrs, children) {
  return new VirtualDom(tag, attrs, children)
}

/**
 * 渲染VirtualDom
 * @param virtualDom{VirtualDom}
 * @returns {HTMLElement}
 */
function render(virtualDom) {
  const {tag, attrs, children} = virtualDom;
  // 根据type创建Dom
  const el = document.createElement(tag);
  // 设置属性
  // TODO 个别属性需要特殊处理
  for (let attr in attrs) {
    if (attrs.hasOwnProperty(attr)) {
      el.setAttribute(attr, attrs[attr]);
    }
  }
  // 渲染子元素 如果是字符串就直接添加
  children.map(child => {
    if (child instanceof VirtualDom) {
      el.appendChild(render(child));
    } else if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child));
    }
  });
  return el;
}

/**
 * 渲染到界面
 * @param el{HTMLElement}
 * @param target{HTMLElement}
 */
function renderRoot(el, target) {
  target.appendChild(el);
}

export {VirtualDom, createVirtualDom, render, renderRoot}
