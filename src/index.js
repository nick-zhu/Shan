function createVComponent(tag, props) {
  return {
    tag,
    props,
    dom: null
  }
}

// Creaet a vElement
function createVElement(tag, config, children = null) {
  const { className, style } = config;

  return {
    tag,
    style,
    props: {
      children: children
    },
    className,
    dom: null
  }
}

function createElement(tag, config, children) {
  // If tag is function, means it's a component
  // example: class app extends component: app is a function
  if (typeof tag === 'function') {
    const vNode = createVComponent(tag, config);
    return vNode;
  }

  const vNode = createVElement(tag, config, children);
  return vNode;
}

class Component {
  constructor(props = {}) {
    this.props = props;
  }

  setState(partialNewState) {}

  // Will be overwritten
  render() {}
}

function mountVText(vText, parentDomNode) {
  parentDomNode.textContent = vText;
  return vText;
}

function mountVElement(vElement, parentDomNode) {
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
    props.children.forEach(ele => {
      mount(ele, domNode);
    })
  }

  if (style) {
    Object.keys(style).forEach(skey => {
      domNode.style[skey] = style[skey]
    });
  }

  parentDomNode.appendChild(domNode);

  return domNode;
}

function mountVComponent(vComponent, parentDomNode) {
  const { tag, props } = vComponent;

  // instanciate the vComponent
  const instance = new tag(props);

  // render will return nodes, could be either vElement or vComponent
  const currentElement = instance.render();

  const dom = mount(currentElement, parentDomNode);

  vComponent._instance = instance;
  vComponent.dom = dom;

  parentDomNode.appendChild(dom);

  return dom;
}

function mount(input, parentDomNode) {
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

const root = document.querySelector('.root')

class App extends Component {
  render() {
    return createElement('div', { style: { height: '100px', background: 'red'} }, [
      createElement('h1', {}, [ this.props.message ])
    ]);
  }
}

mount(createElement(App, { message: 'Hello there!' }), root);