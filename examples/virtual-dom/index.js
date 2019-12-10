import {createVirtualDom, render, renderRoot} from '../../javascript/virtual-dom-diff/virtual-dom';

const virtualDom = createVirtualDom('ul', {id: 'ul'}, [
  createVirtualDom('li', {id: 'li1'}, ['li1']),
  createVirtualDom('li', {id: 'li2'}, ['li2']),
  createVirtualDom('li', {id: 'li3'}, ['li3']),
  createVirtualDom('li', {id: 'li4'}, ['li4']),
]);

const el = render(virtualDom);

renderRoot(el, document.body);
