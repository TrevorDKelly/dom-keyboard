import Key from "./modules/key.mjs";
import Container from "./modules/container.mjs";

document.addEventListener("DOMContentLoaded", function() {
  let keyboard = new Keyboard("100%");
  document.body.appendChild(keyboard.node);
});

function Keyboard(width) {
  this.container = new Container(width);
  this.node = this.container.box;
  makeKeys.call(this);
}

Keyboard.prototype = {
  constructor: Keyboard,
}

function makeKeys() {
  KEY_FLEX_GROWS.forEach( row => {
    let div = document.createElement('div');
    Object.assign(div.style, rowStyle);
    row.forEach( size => {
      let key = new Key('A', size);
      div.appendChild(key.div);
    });
    this.container.keyRows.appendChild(div);
  });
}

const KEY_FLEX_GROWS = [
  (new Array(13).fill(1)).concat(1.5),
  [1.5].concat(new Array(13).fill(1)),
  [1.8333].concat(new Array(11).fill(1)).concat(1.8333),
  [2.413].concat(new Array(10).fill(1)).concat(2.413),
  [1, 1, 1, 5, 1, 1, 3]
];

const rowStyle = {
  display: "flex",
  gap: "1%",
  padding: "0.5%",
  alignItems: "stretch",
  alignContent: "stretch",
  justifyContent: "space-between",
  height: "20%",
}

