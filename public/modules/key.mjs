const KEY_CSS = {
  backgroundColor: "black",
  borderRadius: "0.25em",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

function setStyle(flexSize) {
  Object.assign(this.div.style, KEY_CSS);
  this.div.style.flex = flexSize;
}

function Key(content, flexSize) {
  this.div = document.createElement('div');
  this.setContent(content);
  setStyle.call(this, flexSize);
}

Key.prototype = {
  constructor: Key,

  setContent(content) {
    this.div.innerHTML = content;
    this.div.dataset.key = content;
  },
};

export default Key;

