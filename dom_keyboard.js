import Layout from "./modules/layout.mjs";

let layouts = [];

function makeLayout(width, id) {
  let layout = new Layout(width, id);
  layout.fillKeys();
  layouts.push(layout);
  return [layout.container, layout.allKeys];
}

function DOMKeyboard(width, id, options) {
  if (typeof id !== "string") {
    options = id;
    id = undefined;
  }

  [this.node, this.keys] = makeLayout(width, id);
  this.options = setDefaults(options);
  this.addEvents();
}

DOMKeyboard.prototype = {
  constructor: Keyboard,

  addEvents() {
    if (this.options.reactToKeyPress) {
      document.addEventListener('keydown', defaultKeyDown.bind(this));
      document.addEventListener('keyup', defaultKeyUp.bind(this));
    }
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

  async press(selected, time = 100) {
    let matches = this.keys.filter( key => key.match(selected));

    if (matches.length === 1 && selected === matches[0].shift) {
      let key = matches[0];
      let shiftSide = key.side === "Left" ? "Right" : "Left";
      let shiftKey = this.getKey(`Shift${shiftSide}`);

      await shiftKey.down();
      await key.press(time);
      await shiftKey.up();
    } else {
      let promises = []
      matches.forEach(key => {
        let pressPromise = new Promise(async (resolve, reject) => {
          await key.press(time);
          resolve();
        });
        promises.push(pressPromise);
      });
      await Promise.all(promises);
    }
  },

  async typeInto(node, text) {
    let characters = text.split('');
    let index = 0;
    for (let i = 0; i < characters.length; i++) {
      let key = this.getKey(characters[index]);
      await key.down();
      node.innerHTML += character;
      await key.up();
    }
  },
}

function setDefaults(options) {
  options ||= {};
  let defaults = {
    reactToKeyPress: true,
  }

  return {
    ...defaults,
    ...options,
  };
}

async function defaultKeyDown(event) {
  let key = this.getKey(event.code);
  await key.down();
}

async function defaultKeyUp(event) {
  let key = this.getKey(event.code);
  await key.up();
}

function keyEvent(event, args) {
  let [selected, callback] = parseKeyEventArgs(args);
  let key = this.getKey(event.code);

  if (selected === null || key.match(selected)) {
    callback(key);
  }
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

export default DOMKeyboard;
