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
  layout.fillKeys();
  layouts.push(layout);
  return [layout.container, layout.allKeys];
}

function JSKeyboard(width, id) {
  createCSSClasses();
  [this.node, this.keys] = makeLayout(width, id);
  this.addEvents();
}

JSKeyboard.prototype = {
  constructor: Keyboard,

  addEvents() {
    document.addEventListener('keydown', defaultKeyDown.bind(this));
    document.addEventListener('keyup', defaultKeyUp.bind(this));
  },

  getKey(code) {
    return this.keys.find(k => k.code === code);
  },

  onKeyDown(...args) {
    document.addEventListener('keydown', (e) => keyEvent.call(this, e, args));
  },

  onKeyUp(...args) {
    document.addEventListener('keyup', (e) => keyEvent.call(this, e, args));
  },
}

function defaultKeyDown(event) {
  let key = this.getKey(event.code);
  key.down();
}

function defaultKeyUp(event) {
  let key = this.getKey(event.code);
  key.up();
}

function keyMatch({ key, code }, selected) {
  return selected.includes(key) || selected.includes(code);
}

function keyEvent(event, args) {
  let [selected, callback] = parseKeyEventArgs(args);
  let key = this.getKey(event.code);

  if (!key.match(selected)) return;

  callback(key);
}

function parseKeyEventArgs(args) {
  let selected;
  let callback;

  if (typeof args[0] === 'function') {
    selected = null;
    callback = args[0];
  } else {
    selected = args[0];
    callback = args[1];
  }

  return [selected, callback];
}

export default JSKeyboard;
