import {createElement, mount} from './shan';
import Component from './Component'

const root = document.querySelector('.root')

class NestedApp extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate() {
    return this.props.counter % 2;
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