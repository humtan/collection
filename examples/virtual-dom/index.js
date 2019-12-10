import {createVirtualDom, render, renderRoot} from '../../javascript/virtual-dom-diff/virtual-dom';
import {diff} from "../../javascript/virtual-dom-diff/diff";

const virtualDom = createVirtualDom('ul', {id: 'ul'}, [
  createVirtualDom('li', {id: 'li1'}, ['li1']),
  createVirtualDom('li', {id: 'li2'}, ['li2']),
  createVirtualDom('li', {id: 'li3'}, ['li3']),
  createVirtualDom('li', {id: 'li4'}, ['li4']),
]);

const el = render(virtualDom);

renderRoot(el, document.body);

const newVirtualDom = createVirtualDom('ol', {id: 'ol'}, [
  createVirtualDom('li', {id: 'li1'}, ['li1']),
  createVirtualDom('li', {id: 'li2'}, ['li2']),
  createVirtualDom('li', {id: 'li33'}, ['li3']),
  createVirtualDom('li', {id: 'li4'}, ['li44']),
]);

setTimeout(() => {
  const patches = diff(virtualDom, newVirtualDom);
  console.log(patches);
}, 2000);
