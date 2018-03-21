import { create } from "domain";

// Creaet a vElement

function createVElement(tag, config, children=null) {
  const { className } = config;

  return {
    tag: tag,
    props: {
      children: children
    },
    className: className,
    dom: null
  }
}

function mountVElement(vElement, parentDomNode) {
  const { tag, className, props } = vElement;

  // creat a native DOM node
  const domNode = document.createElement(tag);

  // save the DOM node on vElement
  vElement.dom = domNode;

  if(className) {
    domNode.className = className;
  }

  // if has children, recursively mount elements
  if(props.children) {
    props.children.forEach( ele => {
      mountVElement(ele, domNode);
    })
  }

  parentDomNode.appendChild(domNode);
}

const root = document.querySelector('.root')

const myApp = createVElement('div', { className: 'my-class' }, [
  createVElement('h1', { className:'my-header' }),
  createVElement('div', { className:'my-container' }, [
    createVElement('div', { className:'my-sub-container' }, [
      createVElement('div', { className:'my-sub-sub-container' }, [
        createVElement('div', { className:'my-sub-sub-sub-container' }, [
          createVElement('div', { className:'my-sub-sub-sub-sub-container' }, [
            createVElement('div', { className:'my-sub-sub-sub-sub-sub-container' }, []),
            createVElement('h1', { className:'my-sub-sub-sub-sub-sub-header' }, [])
          ])
        ])
      ])
    ]),
  ])
]);

mountVElement(myApp, root);