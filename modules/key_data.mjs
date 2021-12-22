const KEY_CODES_BY_ROW = [
  [
    "Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6",
    "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace"
  ],
  [
    "Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI",
    "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash"
  ],
  [
    "CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ",
    "KeyK", "KeyL", "Semicolon", "Quote", "Enter"
  ],
  [
    "ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ShiftRight"
  ],
  [
    "fn", "ControlLeft", "AltLeft", "MetaLeft", "Space", "MetaRight", "AltRight"
  ]
];

const KEY_DATA_BY_ROW = [
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
    characters: ["fn", "control", "option", "command", " ", "command", "option"],
    shifts: [null, null, "alt", "\u2318", null, "\u2318", "alt", null],
    flexes: [1, 1, 1, 1.24, 5.66, 1.25, 1],
  },
];

const UNICODE_ARROWS = {
  'ArrowUp': "\u25B2",
  'ArrowLeft': "\u25C0",
  'ArrowDown': "\u25BC",
  'ArrowRight': "\u25BA",
};

const KEY_DATA = {
  KEY_CODES_BY_ROW,
  KEY_DATA_BY_ROW,
  UNICODE_ARROWS,
};

export default KEY_DATA;
