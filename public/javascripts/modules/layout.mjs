import Keys from "./keys.mjs";

function assignStyles(width) {
  this.container.classList.add('keyboard-container');
  this.container.style.width = width;
  this.rowsContainer.classList.add('keyboard-all-rows');
}

function Layout(width, id) {
  this.container  = document.createElement('div');
  if (id) this.container.id = id;
  this.rowsContainer = document.createElement('div');
  this.container.appendChild(this.rowsContainer);
  assignStyles.call(this, width);
  this.keys = new Keys();
  this.fillKeys();
}

Layout.prototype = {
  constructor: Layout,

  fillKeys() {
    this.keys.rows.forEach( row => {
      let rowNode = document.createElement('div');
      rowNode.classList.add('keyboard-single-row')
      row.forEach( key => {
        rowNode.appendChild(this.keys.getKey(key).node);
      });
      this.rowsContainer.appendChild(rowNode);
    });
  },
}

function makeKeys() {
  KEY_FLEX_SIZES.forEach( row => {
    row.forEach( size => {
      let key = new Key('A', size);
      div.appendChild(key.div);
    });
    this.container.keyRows.appendChild(div);
  });
}

export default Layout;
