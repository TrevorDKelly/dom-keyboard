const CONTROL_KEYS = [
  "Tab", "Backspace", "Enter", "ShiftLeft", "ShiftRight", "ControlLeft", "fn",
  "AltLeft", "MetaLeft", "MetaRight", "AltRight", "CapsLock"
];

function Key({ code, character, shift, flex }) {
  this.code = code;
  this.node = document.createElement('div');
  this.node.classList.add('keyboard-key-up');
  this.node.style.flex = flex;
  this.character = character;
  this.shift = shift;
  this.setType();
  this.setContent(code);
}

Key.prototype = {
  constructor: Key,

  setContent(code) {
    this.node.dataset.key = code;
    if (this.type === "letter" || this.type === "arrow") {
      this.node.innerHTML = this.character.toUpperCase();
    } else {
      let topChar = document.createElement("p");
      let bottomChar = document.createElement("p");
      topChar.innerHTML = this.shift || " ";
      bottomChar.innerHTML = this.character || " ";
      this.node.appendChild(topChar);
      this.node.appendChild(bottomChar);
    }
  },

  setType() {
    this.type = getType(this.code);
    this.node.classList.add(`keyboard-key-${this.type}`);
  },

  down() {
    this.node.classList.add('keyboard-key-down');
  },

  up() {
    this.node.classList.remove('keyboard-key-down');
  },

  match(selected) {
    return selected.includes(this.code)
           || selected.includes(this.character)
           || selected.includes(this.type)
           || selected.includes(this.shift);
  },
};

function getType(code) {
  if (code.includes("Arrow")) {
    return "arrow";
  } else if (code.includes("Key")) {
    return "letter";
  } else if (code.includes("Digit")) {
    return "number";
  } else if (CONTROL_KEYS.includes(code)) {
    return 'control';
  } else {
    return "special";
  }
}

export default Key;

