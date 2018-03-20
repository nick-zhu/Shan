import LikeButton from './Button';
import './stylesheets/style.css';
import Pika from './images/pika.jpg';

const wrapper = document.querySelector('.wrapper')

const mount = (component, wrapper) => {
  wrapper.appendChild(component.renderDOM());
  component.container = wrapper;
  // component.onStateChange = (oldElement, newElement) => {
  //   wrapper.insertBefore(newElement, oldElement);
  //   wrapper.removeChild(oldElement);
  // };
};


mount(new LikeButton({isLiked: true}), wrapper);
mount(new LikeButton(), wrapper);
