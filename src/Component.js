export default class Component {
  constructor(props = {}) {
    this.props = props;
    this.state = {};
  }

  setState(state = {}) {
    Object.assign(this.state, state);
    let oldElement = this.element;
    this.element = this.renderDOM();

    if(this.onStateChange) {
      this.onStateChange(oldElement, this.element)
    }

    // If pass in wrapper
    this.container.insertBefore(this.element, oldElement);
    this.container.removeChild(oldElement);
  }

  createDOMFromString(domString) {
    const container = document.createElement('div');
    container.innerHTML = domString;

    return container;
  }

  renderDOM() {
    this.element = this.createDOMFromString(this.render());
    if(this.onClick) {
      this.element.addEventListener('click', this.onClick, false);
    }
    return this.element;
  }
}