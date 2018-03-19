import Button from './Button';
import './stylesheets/style.css';
import Pika from './images/pika.jpg';

const createDOMFromString = (domString) => {
  const container = document.createElement('div');
  container.innerHTML = domString;

  return container;
}

class LikeButton {
  render() {
    this.element = createDOMFromString(`
      <button class='like-btn'>
        <span class='like-text'>Like</span>
        <span>👍</span>
      </button>
    `)
    this.element.addEventListener('click', ()=> console.log('click', false));
    return this.element;
  }
}

const wrapper = document.querySelector('.wrapper')
const likeButton1 = new LikeButton()
wrapper.appendChild(likeButton1.render());

const likeButton2 = new LikeButton()
wrapper.appendChild(likeButton2.render());


