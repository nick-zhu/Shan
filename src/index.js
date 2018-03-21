// Creaet a vElement

function createVElement(tag, config) {
  const { className } = config;

  return {
    tag: tag,
    className: className,
    dom: null
  }
}

function mountVElement(vElement, parentDomNode) {
  const { tag, className } = vElement;

  // creat a native DOM node
  const domNode = document.createElement(tag);

  // save the DOM node on vElement
  vElement.dom = domNode;

  if(className) {
    domNode.className = className;
  }

  parentDomNode.appendChild(domNode);
}

const root = document.querySelector('.root')

const app = createVElement('div', {className: 'my-app'})

mountVElement(app, root);