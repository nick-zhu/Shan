import {mount} from '../shan';

export function mountVComponent(vComponent, parentDomNode) {
  const { tag, props } = vComponent;

  // instanciate the vComponent
  const instance = new tag(props);

  // render will return nodes, could be either vElement or vComponent
  const nextRenderedElement = instance.render();

  instance._currentElement = nextRenderedElement;
  instance._parentNode = parentDomNode;

  const dom = mount(nextRenderedElement, parentDomNode);

  vComponent._instance = instance;
  vComponent.dom = dom;

  parentDomNode.appendChild(dom);

  return dom;
}