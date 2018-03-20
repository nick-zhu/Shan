import Component from './Component';

export default class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = { isLiked: false };
    Object.assign(this.state, props);
  }

  toggleLike = () => {
    this.setState({
      isLiked: !this.state.isLiked
    })
  }

  onClick = () => {
    this.setState({
      isLiked: !this.state.isLiked
    })
  }

  render() {
    return `
      <button class='like-btn'>
        <span class='like-text'>${!this.state.isLiked ? 'Like' : 'Undo'}</span>
        <span>👍</span>
      </button>
    `
  }
}