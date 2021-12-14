function Key({ key, character, shift, flex }) {
  this.id = key;
  this.node = document.createElement('div');
  this.node.classList.add('keyboard-key');
  this.node.style.flex = flex;
  this.character = character;
  this.shift = shift;
  this.setContent(key);
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

