import {updateChildren} from '../shan';

export function updateVElement(prevElement, nextElement) {
  const dom = prevElement.dom;
  nextElement.dom = dom;

  // update children
  if (nextElement.props.children) {
    updateChildren(prevElement.props.children, nextElement.props.children, dom);
  }

  // update style
  const nextStyle = nextElement.style;
  if (prevElement.style !== nextStyle) {
    Object.keys(nextStyle).forEach((s) => dom.style[s] = nextStyle[s])
  }
}