import Keys from "./keys.mjs";

const BOX_CSS = {
  position: "relative",
  paddingBottom: "34%",
  fontSize: "2.5vw",
  color: "white",
};

const ALL_ROWS_CSS = {
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: "flex",
  flexDirection: "column",
};

const ROW_CSS = {
  display: "flex",
  gap: "1%",
  padding: "0.5%",
  alignItems: "stretch",
  alignContent: "stretch",
  justifyContent: "space-between",
  height: "20%",
}

function assignStyles(width) {
  Object.assign(this.container.style, BOX_CSS);
  this.container.style.width = width;
  Object.assign(this.rowsContainer.style, ALL_ROWS_CSS);
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
      Object.assign(rowNode.style, ROW_CSS);
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
