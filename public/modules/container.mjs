const BOX_CSS = {
  position: "relative",
  paddingBottom: "34%",
  fontSize: "2.5vw",
  color: "white",
};

const KEY_ROWS_CSS = {
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: "flex",
  flexDirection: "column",
};

function assignStyles(width) {
  Object.assign(this.box.style, BOX_CSS);
  this.box.style.width = width;
  Object.assign(this.keyRows.style, KEY_ROWS_CSS);
}

function Container(width) {
  this.box  = document.createElement('div');
  this.keyRows = document.createElement('div');
  this.box.appendChild(this.keyRows);
  assignStyles.call(this, width);
}

Container.prototype = {
  constructor: Container,
}

export default Container;
