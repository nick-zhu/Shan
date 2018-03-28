import { createVComponent } from './vComponent/create';
import { mountVComponent } from './vComponent/mount';
import { updateVComponent } from './vComponent/update';

import { createVElement } from './vElement/create';
import { mountVElement } from './vElement/mount';
import { updateVElement } from './vElement/update';

import { mountVText } from './vText/mount';
import { updateVText } from './vText/update';

import ComponentClass from './Component';

function createElement(tag, config, ...children) {
  // If tag is function, means it's a component
  // example: class app extends component: app is a function
  if (typeof tag === 'function') {
    const vNode = createVComponent(tag, config);
    return vNode;
  }

  const vNode = createVElement(tag, config, children);
  return vNode;
}

export function updateChildren(prevChildren, nextChildren, parentDomNode) {
  if (!Array.isArray(nextChildren)) {
    nextChildren = [nextChildren];
  }
  if (!Array.isArray(prevChildren)) {
    prevChildren = [prevChildren];
  }

  for (let i = 0; i < nextChildren.length; i++) {
    const nextChild = nextChildren[i];
    const prevChild = prevChildren[i];

    //Check if the vNode is a vText
    if (typeof nextChild === 'string' && typeof prevChild === 'string') {
      updateVText(prevChild, nextChild, parentDomNode);
      continue;
    } else {
      update(prevChild, nextChild);
    }
  }
}

export function update(prevElement, nextElement) {
  if (prevElement.tag === nextElement.tag) {
    if (typeof prevElement.tag === 'string') {
      updateVElement(prevElement, nextElement);
    } else if (typeof prevElement.tag === 'function') {
      updateVComponent(prevElement, nextElement);
    }
  } else {

  }
}

export function mount(input, parentDomNode) {
  if (typeof input === 'string' || typeof input === 'number') {
    return mountVText(input, parentDomNode);
  }
  else if (typeof input.tag === 'function') {
    return mountVComponent(input, parentDomNode);
  }
  else {
    return mountVElement(input, parentDomNode);
  }
}

const React = {
  createElement,
  render: mount,
  Component
}

export default React;
export const Component = ComponentClass;