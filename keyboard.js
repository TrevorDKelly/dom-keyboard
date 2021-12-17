import Key from "./modules/key.mjs";
import Layout from "./modules/layout.mjs";
import cssString from "./modules/styles.mjs";

function createCSSClasses() {
  let style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = cssString;
  document.head.appendChild(style);
}

let layouts = [];

function makeLayout(width, id) {
  let layout = new Layout(width, id);
  layouts.push(layout);
  return layout.container;
}

function JSKeyboard(width, id) {
  createCSSClasses();
  this.node = makeLayout(width, id);
  this.addEvents();
}

JSKeyboard.prototype = {
  constructor: Keyboard,

  addEvents() {
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
  }
}

function keyDown(e) {
  let key = document.querySelector(`[data-key='${e.code}']`);
  key.classList.add('keyboard-key-down');
}

function keyUp(e) {
  let key = document.querySelector(`[data-key='${e.code}']`);
  key.classList.remove('keyboard-key-down');
}

export default JSKeyboard;
