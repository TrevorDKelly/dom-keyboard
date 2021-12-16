function Key({ key, character, shift, flex }) {
  this.id = key;
  this.node = document.createElement('div');
  this.node.classList.add('keyboard-key');
  this.node.style.flex = flex;
  this.character = character;
  this.shift = shift;
  this.setType();
  this.setContent(key);
}

Key.prototype = {
  constructor: Key,

  setContent(content) {
    this.node.dataset.key = content;
    if (this.type === "letter") {
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
    this.type = getType(this.id);
    this.node.classList.add(`keyboard-key-${this.type}`);
  },
};

function getType(key) {
  if (key.length > 1) {
    return "command";
  } else if (/[a-z]/.test(key)) {
    return "letter";
  } else if (/[0-9]/.test(key)) {
    return "number";
  } else {
    return "special";
  }
}

export default Key;

