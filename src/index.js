import { create } from "domain";

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

function mount(input, parentDomNode) {
  if (typeof input === 'string' || typeof input === 'number') {
    mountVText(input, parentDomNode);
  } else {
    mountVElement(input, parentDomNode);
  }
}

function mountVText(vText, parentDomNode) {
  parentDomNode.textContent = vText;
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
}

const root = document.querySelector('.root')

const myApp = createVElement('div',
  {
    style: { background: 'red', height: '100px' }
  },
  [
    createVElement('h1',
      {
        style: { color: 'white' }
      },
      ['Hello World']
    ),
    createVElement('div',
      {
        className: 'my-container'
      },
      [createVElement('p', {}, ['A container with some nice paragraph'])]
    )
  ])

mount(myApp, root);