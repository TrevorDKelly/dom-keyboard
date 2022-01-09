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

  getKey(selected) {
    return this.keys.find(k => k.match(selected));
  },

  onKeyDown(...args) {
    document.addEventListener('keydown', (e) => keyEvent.call(this, e, args));
  },

  onKeyUp(...args) {
    document.addEventListener('keyup', (e) => keyEvent.call(this, e, args));
  },

  press(selected, time = 100) {
    let matches = this.keys.filter( key => key.match(selected));

    if (matches.length === 1 && selected === matches[0].shift) {
      let key = matches[0];
      let shiftSide = key.side === "Left" ? "Right" : "Left";
      this.getKey(`Shift${shiftSide}`).press(time * 2);
      setTimeout(() => key.press(time), time);
    } else {
      matches.forEach(key => key.press(time));
    }
  },

  typeInto(node, text) {
    let characters = text.split('');
    let index = 0;
    let interval = setInterval(() => {
      let character = characters[index];
      this.press(character);
      node.innerHTML += character;
      index += 1;
      if (index >= characters.length) clearInterval(interval);
    }, 200);
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
