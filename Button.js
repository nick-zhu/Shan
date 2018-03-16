class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const div = document.createElement('div');
    div.innerHTML = 'test';
    return div
  }
}