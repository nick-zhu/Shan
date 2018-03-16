import Component from './Component';

export default class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const div = document.createElement('div');
    div.innerHTML = 'TEST';
    return div
  }
}