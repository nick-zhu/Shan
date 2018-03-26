import {mount} from '../shan';

export function mountVElement(vElement, parentDomNode) {
  const { tag, className, style, props } = vElement;

  // creat a native DOM node
  const domNode = document.createElement(tag);

  // save the DOM node on vElement
  vElement.dom = domNode;

  if (className) {
    domNode.className = className;
  }

  // if has children, recursively mount elements
  if (props.children) {
    if (Array.isArray(props.children)) {
      props.children.forEach(ele => {
        mount(ele, domNode);
      })
    } else {
      mount(props.children, domNode);
    }
  }

  if (style) {
    Object.keys(style).forEach(skey => {
      domNode.style[skey] = style[skey]
    });
  }

  parentDomNode.appendChild(domNode);

  return domNode;
}