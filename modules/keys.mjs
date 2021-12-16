import Key from "./key.mjs"

const ROWS = [
  "`1234567890-=".split('').concat("delete"),
  ["tab"].concat("qwertyuiop[]\\".split('')),
  ["caps"].concat("asdfghjkl;'".split('')).concat("enter"),
  ["shift-left"].concat("zxcvbnm,./".split('')).concat("shift-right"),
  ["fn", "control", "option-left", "command-left", " ", "command-right", "option-right"]
];

const DATA = [
  {
    characters: "`1234567890-=".split('').concat("delete"),
    shifts: "~!@#$%^&*()_+".split('').concat(null),
    flexes: (new Array(13).fill(1)).concat(1.5),
  },
  {
    characters: ["tab"].concat("qwertyuiop[]\\".split('')),
    shifts: [null].concat("QWERTYUIOP{}|".split('')),
    flexes: [1.5].concat(new Array(13).fill(1)),
  },
  {
    characters: ["caps"].concat("asdfghjkl;'".split('')).concat("return"),
    shifts: [null].concat("ASDFGHJKL:\"".split('')).concat("enter"),
    flexes: [1.8333].concat(new Array(11).fill(1)).concat(1.8333),
  },
  {
    characters: ["shift"].concat("zxcvbnm,./".split('')).concat("shift"),
    shifts: [null].concat("ZXCVBNM<>?".split('')).concat(null),
    flexes: [2.413].concat(new Array(10).fill(1)).concat(2.413),
  },
  {
    characters: ["fn", "control", "option", "command", null, "command", "option"],
    shifts: [null, null, "alt", "\u2318", null, "\u2318", "alt", null],
    flexes: [1, 1, 1, 1.24, 5.66, 1.25, 1],
  },
];

const UNICODE_ARROWS = {
  "up-arrow": "\u25B2",
  "down-arrow": "\u25BC",
  "left-arrow": "\u25C0",
  "right-arrow": "\u25BA",
};

function Keys() {
  this.rows = ROWS;
  this.allKeys = [];
  this.makeKeys();
}

Keys.prototype = {
  constructor: Keys,

  makeKeys() {
    this.rows.forEach( (row, rowNumber) => {
      let rowData = DATA[rowNumber];
      row.forEach( (key, keyNumber) => {
        let keyData = {
          key: key,
          character: rowData.characters[keyNumber],
          shift: rowData.shifts[keyNumber],
          flex: rowData.flexes[keyNumber],
        };
        this.allKeys.push(new Key(keyData));
      });
    });
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
    let key = this.makeArrow("up-arrow");
    topDiv.appendChild(key.node);
  },

  makeBottomArrows(bottomDiv) {
    let keyNames = ["left-arrow", "down-arrow", "right-arrow"];
    keyNames.forEach( keyName => {
      let key = this.makeArrow(keyName);
      bottomDiv.appendChild(key.node);
    });
  },

  makeArrow(name) {
    let arrow = {
      key: name,
      character: UNICODE_ARROWS[name],
      shift: null,
      flex: 0.3,
    }

    let key = new Key(arrow);
    this.allKeys.push(key);
    return key;
  },

  getKey(key) {
    return this.allKeys.find( k => k.id === key);
  },
}

export default Keys;
