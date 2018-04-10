import { typeNum } from './utils';

let containerMap = {};
let mountId = 0;

function mountIdIncrement() {
  return mountId++;
}

function mountNativeElement(vNode, parentDomNode, instance) {
  const domNode = renderByShan(vNode, parentDomNode, false, {}, instance);
  vNode._hostNode = domNode;
  vNode._mountId = mountIdIncrement();
  return domNode;
}

function mountTextComponent(vNode, domNode) {
  let fixText = vNode.props === 'createPortal' ? '' : vNode.props;
  let textDomNode = document.createTextNode(fixText);
  domNode.appendChild(textDomNode);
  vNode._hostNode = textDomNode;
  vNode._mountId = mountIdIncrement();
  return textDomNode;
}

function mountChilren(childrenVNode, parentDomNode, parentContext, instance, parentVNode) {
  let childrenType = typeNum(childrenVNode);
  let flattenChildrenList = childrenVNode;

  if (childrenVNode === undefined) {
    flattenChildrenList = flattenChildren(childrenVNode, parentVNode);
  }

  if (childrenType === 8 && childrenVNode !== undefined) { //vnode
    flattenChildrenList = flattenChildren(childrenVNode, parentVNode);

    if (typeNum(childrenVNode.type) === 5) {
      flattenChildrenList._hostNode = renderByShan(flattenChildrenList, parentDomNode, false, parentContext, instance);
    } else if (typeNum(childrenVNode.type) === 3 || typeNum(childrenVNode.type) === 4) {
      flattenChildrenList._hostNode = mountNativeElement(flattenChildrenList, parentDomNode, instance);
    }
  }

  if (childrenType === 7) { //list
    flattenChildrenList = flattenChildren(childrenVNode, parentVNode);
    flattenChildrenList.forEach((item) => {
      if (item) {
        if (typeof item.type === 'function') {
          mountComponent(item, parentDomNode, parentContext);
        } else {
          renderByShan(item, parentDomNode, false, parentContext, instance);
        }
      }
    });
  }

  if (childrenType === 4 || childrenType === 3) { //string or number
    flattenChildrenList = flattenChildren(childrenVNode, parentVNode);
    mountTextComponent(flattenChildrenList, parentDomNode);
  }
  return flattenChildrenList;
}

function renderByShan(vNode, container, isUpdate, parentContext, instance) {
  const { type, props } = vNode;

  if (!type) return;

  const { children } = props;
  let domNode;

  // 3 categories: user defined component is function, text node, normal node
  if (typeof type === 'function') {
    const fixContext = parentContext || {};
    domNode = mountComponent(vNode, container, fixContext);
  } else if (typeof type === 'string' && type === '#text') {
    domNode = mountTextComponent(vNode, container);
  } else {
    domNode = document.createElement(type);
  }

  if (typeof type !== 'function') {
    if (typeNum(children) > 2 && children !== undefined) {
      const newChildren = mountChilren(children, domNode, parentContext, instance, vNode);
      props.children = newChildren;
    }
  }

  vNode._hostNode = domNode; // Cache node

  if (typeNum(domNode) === 7) { // is Array
    if (isUpdate) return domNode;
    else {
      if (container && domNode && container.nodeName !== '#text') {
        domNode.forEach(DOM_SINGLE_NODE => {
          container.appendChild(DOM_SINGLE_NODE);
        });
      }
    }
  }

  // TODO: 
  setRef();
  mapProps();

  if (isUpdate) return domNode;
  else {
    vNode._mountId = mountIdIncrement();
    if (container && domNode && container.nodeName !== '#text') {
      container.appendChild(domNode);
    }
  }

  return domNode;
}

/**
 * 
 * @param {vNode} vNode is a virtual node, used babel to translate jsx file 
 * @param {*} a real DOM container
 */
export function render(vNode, container) {
  if (typeNum(container) !== 8) {
    throw new Error('Target container is not a DOM element');
  }

  const uniqueKey = container.uniqueKey;
  if (container.uniqueKey) {
    // Already rendered previously
    const oldVnode = containerMap[uniqueKey];
    const rootVnode = update(oldVnode, vNode, container);
    return vNode._instance;
  } else {
    // Render for the first time
    vNode.isTop = true;
    container.uniqueKey = mountIdIncrement();
    containerMap[container.uniqueKey] = vNode;
    renderByShan(vNode, container, false, vNode.context, vNode.owner);
    return vNode._instance;
  }
}