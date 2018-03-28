import { createElement } from './createElement';
import { render } from './vdom';
import { ReactClass } from './component';

const React = {
  createElement,
  render,
  Component: ReactClass
}

export const Component = ReactClass;
export const createElement = createElement;
export default React;