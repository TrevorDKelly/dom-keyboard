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

  async press(selected, ...args) {
    let matches = this.keys.filter( key => key.match(selected));
    let [time, callback] = parseTwoArgsForCallback(args);
    if (!time) {
      time = 100;
    }
    const halfTime = time / 2;

    if (matches.length === 1 && selected === matches[0].shift) {
      let key = matches[0];
      let shiftSide = key.side === "Left" ? "Right" : "Left";
      let shiftKey = this.getKey(`Shift${shiftSide}`);

      await shiftKey.down();
      await key.down(halfTime);
      if (callback) callback(key);
      await key.up(halfTime);
      await shiftKey.up();
    } else {
      let promises = []
      matches.forEach(key => {
        let pressPromise = new Promise(async (resolve, reject) => {
          await key.down(halfTime);
          if (callback) callback(key);
          await key.up(halfTime);
          resolve();
        });
        promises.push(pressPromise);
      });
      await Promise.all(promises);
    }
  },

  async typeInto(node, text, ...rest) {
    let characters = text.split('');
    let [speed, variability, callback] = parseTypeIntoArgs(rest);
    let min;
    let max;
    if (variability > 0) {
      min = speed - variability;
      max = speed + variability;
    }

    for (let i = 0; i < characters.length; i++) {
      let character = characters[i];
      if (variability) {
        speed = randomSpeed(min, max);
      }
      await this.press(character, speed, (key) => {
        node.innerHTML += character;
        if (callback) callback(key);
      });
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
  let [selected, callback] = parseTwoArgsForCallback(args);
  let key = this.getKey(event.code);

  if (selected === null || key.match(selected)) {
    if(callback) callback(key);
  }
}

function parseTwoArgsForCallback(args) {
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

function parseTypeIntoArgs(args) {
  let speed = 100;
  let variability = 0;
  let callback;

  if (typeof args[0] === 'function') {
    callback = args[0];
  } else if (typeof args[1] === 'function') {
    speed = args[0];
    callback = args[1];
  } else {
    speed = args[0];
    variability = args[1];
    callback = args[2];
  }

  return [speed, variability, callback]
}

function randomSpeed(min, max) {
  return min + (Math.floor(Math.random() * (max - min)));
}

export default DOMKeyboard;
