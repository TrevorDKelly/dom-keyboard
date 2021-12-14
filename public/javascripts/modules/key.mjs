const KEY_CSS = {
  backgroundColor: "black",
  borderRadius: "0.25em",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

function setStyle(flex) {
  Object.assign(this.node.style, KEY_CSS);
  this.node.style.flex = flex;
}

function Key({ key, character, shift, flex }) {
  this.id = key;
  this.node = document.createElement('div');
  this.character = character;
  this.shift = shift;
  this.setContent(key);
  setStyle.call(this, flex);
}

Key.prototype = {
  constructor: Key,

  setContent(content) {
    if (this.character) {
      this.node.innerHTML = this.character.toUpperCase();
    }
    this.node.dataset.key = content;
  },
};

export default Key;

