class Component {
  constructor( props = {}) {
    this.props = props;
  }

  setState(state) {
    this.state = state;
    console.log(state);
  }
}