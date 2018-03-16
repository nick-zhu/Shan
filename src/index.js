import Button from './Button';
import './style.css';
import Pika from './pika.jpg';

var wrapper = document.querySelector('.wrapper');
let button = new Button();
button = button.render();

let pika = new Image();
pika.src = Pika;

button.appendChild(pika);
wrapper.appendChild(button);