import Key from "./modules/key.mjs";
import Layout from "./modules/layout.mjs";

let layouts = [];

function makeLayout(width, id) {
  let layout = new Layout(width, id);
  layouts.push(layout);
  return layout.container;
}

function JSKeyboard(width, id) {
  this.node = makeLayout(width, id);
}

JSKeyboard.prototype = {
  constructor: Keyboard,
}

export default JSKeyboard;
