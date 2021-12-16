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
    document.addEventListener('keypress', pressKey);
  }
}

function pressKey(e) {
  let key = document.querySelector(`[data-key='${e.key.toLowerCase()}']`);
  setTimeout(() => {
    key.classList.remove('keyboard-key-down');
  }, 200);
  key.classList.add('keyboard-key-down');
}

export default JSKeyboard;
