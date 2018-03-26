import {update} from './shan';

export default class Component {
  constructor(props = {}) {
    this.props = props;
    this.state = {};

    this._currentElement = null;
    this._pendingState = null;
    this._parentNode = null;
  }

  shouldComponentUpdate() {
    return true;
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