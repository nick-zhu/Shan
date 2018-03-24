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

function updateVElement(prevElement, nextElement) {
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

function updateVText(prevText, nextText, parentDomNode) {
  if (prevText !== nextText) {
    parentDomNode.firstChild.nodeValue = nextText
  }
}

function updateChildren(prevChildren, nextChildren, parentDomNode) {
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

function update(prevElement, nextElement) {
  if (prevElement.tag === nextElement.tag) {
    if (typeof prevElement.tag === 'string') {
      updateVElement(prevElement, nextElement);
    }
  } else {

  }
}

class Component {
  constructor(props = {}) {
    this.props = props;
    this.state = {};

    this._currentElement = null;
    this._pendingState = null;
    this._parentNode = null;
  }

  updateComponent() {
    const preState = this.state;
    const preElement = this._currentElement;

    if (this._pendingState !== preState) {
      this.state = this._pendingState;
      const nextRenderedElement = this.render();
      this._currentElement = nextRenderedElement;

      update(preElement, nextRenderedElement);
    }

    this._pendingState = null;
  }

  setState(partialNewState) {
    this._pendingState = Object.assign({}, this.state, partialNewState);
    this.updateComponent();
  }

  // Will be overwritten
  render() { }
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

function mountVComponent(vComponent, parentDomNode) {
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

class NestedApp extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return createElement('h1', { style: { color: '#' + Math.floor(Math.random() * 16777215).toString(16) } }, `The count from parent is: ${this.props.counter}`)
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      counter: 1
    }
    setInterval(() => {
      this.setState({ counter: this.state.counter + 1 })
    }, 500);
  }

  render() {
    const { counter } = this.state;
    return createElement('div', { style: { height: `${10 * counter}px`, background: '#' + Math.floor(Math.random() * 16777215).toString(16) } }, [
      `the counter is ${counter}`,
      createElement('h1', { style: { color: '#' + Math.floor(Math.random() * 16777215).toString(16) } }, `${'BOOM! '.repeat(counter)}`),
      createElement(NestedApp, { counter: counter })
    ]);
  }
}

mount(createElement(App, { message: 'Hello there!' }), root);