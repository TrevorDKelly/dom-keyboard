import Key from "./modules/key.mjs";
import Layout from "./modules/layout.mjs";
import cssString from "./modules/styles.js";

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
}

JSKeyboard.prototype = {
  constructor: Keyboard,
}

export default JSKeyboard;
