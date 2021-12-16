import Key from "./key.mjs"

const ROWS = [
  "`1234567890-=".split('').concat("delete"),
  ["tab"].concat("qwertyuiop[]\\".split('')),
  ["caps"].concat("asdfghjkl;'".split('')).concat("return"),
  ["shift-left"].concat("zxcvbnm,./".split('')).concat("shift-right"),
  ["fn", "control", "option-left", "command-left", "space", "command-right", "option-right", "arrows"]
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
    shifts: [null, null, "alt", "\u2318", null, "\u2318", "alt", "arrows"],
    flexes: [1, 1, 1, 1.24, 5.66, 1.25, 1, 3.33],
  },
];

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

  getKey(key) {
    return this.allKeys.find( k => k.id === key);
  }
}

export default Keys;
