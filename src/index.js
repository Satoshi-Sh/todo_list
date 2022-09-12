import _ from 'lodash';
import './style.css';
import Icon from './images/man.png'
import hello from './project.js'


hello()

console.log("Hello todo.")


const content = document.querySelector("#content");
console.log(content)
const imageOne = new Image();
imageOne.src = Icon;

content.appendChild(imageOne)


