import { typeNum } from './utils';

const RESERVED_PROPS = {
  ref: true,
  key: true,
  __self: true,
  __source: true
}

class VNode {
  constructor(type, props, key, ref) {
    this.owner = currentOwner.cur,
    this.type = type,
    this.props = props,
    this.key = key,
    this.ref = ref
  }
}

/**
 * Creating virtual DOM
 * @param {String | Function} type 
 * @param {Object} config 
 * @param {Array} children 
 */
function createElement(type, config, ...children) {
  let props = {}, key = null, ref = null, childrenLength = children.length;

  if (config != null) {
    key = config.key === undefined ? null : '' + config.key;
    ref = config.ref === undefined ? null : config.ref;

    // update props with config object
    for (let propName in config) {
      // Skip reserved props
      if (RESERVED_PROPS.hasOwnProperty(propName)) continue;

      // Ensure propName belongs to config itself, not inheritated from prototype
      if (config.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  if (childrenLength === 1) {
    // If children is undefined or null, set it to empty array
    props.children = typeNum(children[0]) > 2 ? children[0] : [];
  }
  else if (childrenLength > 1) {
    props.children = children;
  }

  let defaultProps = type.defaultProps;
  if (defaultProps) {
    for (let propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }

  return new VNode(type, props, key, ref);
}

export {
  VNode,
  createElement
}