import KEY_DATA from "./key_data.mjs";
import Key from "./key.mjs";

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
  this.allKeys = [];
  assignStyles.call(this, width);
}

Layout.prototype = {
  constructor: Layout,

  fillKeys() {
    KEY_DATA.KEY_CODES_BY_ROW.forEach( (rowOfCodes, rowNumber) => {
      let rowNode = document.createElement('div');
      rowNode.classList.add('keyboard-single-row');

      let rowData = KEY_DATA.KEY_DATA_BY_ROW[rowNumber];
      rowOfCodes.forEach( (code, keyNumber) => {
        let keyData = {
          code: code,
          character: rowData.characters[keyNumber],
          shift: rowData.shifts[keyNumber],
          flex: rowData.flexes[keyNumber],
          side: rowData.sides[keyNumber],
        };
        let key = new Key(keyData);
        rowNode.appendChild(key.node);
        this.allKeys.push(key);
      });
      this.rowsContainer.appendChild(rowNode);
    });
    let arrowKeysDiv = this.makeArrows();
    this.rowsContainer.lastElementChild.appendChild(arrowKeysDiv);
  },

  makeArrows() {
    let arrowsDiv = document.createElement('div');
    arrowsDiv.classList.add("keyboard-arrows-container");

    let topDiv = document.createElement('div');
    this.makeTopArrow(topDiv);

    let bottomDiv = document.createElement('div');
    this.makeBottomArrows(bottomDiv);

    topDiv.classList.add('keyboard-arrow-row');
    bottomDiv.classList.add('keyboard-arrow-row');

    arrowsDiv.appendChild(topDiv);
    arrowsDiv.appendChild(bottomDiv);
    return arrowsDiv;
  },

  makeTopArrow(topDiv) {
    let key = this.makeArrow("ArrowUp");
    topDiv.appendChild(key.node);
  },

  makeBottomArrows(bottomDiv) {
    let keyNames = ["ArrowLeft", "ArrowDown", "ArrowRight"];
    keyNames.forEach( keyCode => {
      let key = this.makeArrow(keyCode);
      bottomDiv.appendChild(key.node);
    });
  },

  makeArrow(code) {
    let arrow = {
      code: code,
      character: KEY_DATA.UNICODE_ARROWS[code],
      shift: null,
      flex: 0.3,
      side: "Right",
    }

    let key = new Key(arrow);
    this.allKeys.push(key);
    return key;
  },
}

export default Layout;
