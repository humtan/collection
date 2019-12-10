class VirtualDom {
  /**
   * @param type{string} 标签名
   * @param attrs{Object} 属性
   * @param children{Array<VirtualDom | string>} 子元素
   */
  constructor(type, attrs, children) {
    this.type = type;
    this.attrs = attrs;
    this.children = children;
  }
}

/**
 * 创建VirtualDom
 * @param type{string} 标签名
 * @param attrs{Object} 属性
 * @param children{Array<VirtualDom | string>} 子元素
 * @returns {VirtualDom}
 */
function createVirtualDom(type, attrs, children) {
  return new VirtualDom(type, attrs, children)
}

/**
 * 渲染VirtualDom
 * @param virtualDom{VirtualDom}
 * @returns {HTMLElement}
 */
function render(virtualDom) {
  const {type, attrs, children} = virtualDom;
  // 根据type创建Dom
  const el = document.createElement(type);
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
