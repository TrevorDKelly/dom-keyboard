let cssString = "";

function addCSSClass(name, styles) {
  let string = `.${name} {`;
  Object.keys(styles).forEach(attribute => {
    let attributeName = convertToCssString(attribute);
    let value = styles[attribute];

    string += `${attributeName}: ${value}; `;
  });

  cssString += string + "}\n";
};

function convertToCssString(name) {
  let capital = name.match(/[A-Z]/);
  while (capital) {
    let arr = name.split('');
    let lowercase = capital[0].toLowerCase();
    arr[capital.index] = `-${lowercase}`;
    name = arr.join('')
    capital = name.match(/[A-Z]/);
  }
  return name;
}

const KEY_CSS = {
  backgroundColor: "black",
  borderRadius: "0.25em",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderBottom: "0.3vw solid grey",
  boxShadow: "-0.2vw 0.2vw lightskyblue",
}

const TWO_SYMBOL_KEYS_CSS = {
  flexDirection: "column",
  justifyContent: "space-around",
}

const COMMAND_KEYS_CSS = {
  fontSize: "0.6em",
  flexDirection: "column",
  justifyContent: "space-around",
}

const CONTAINER_CSS = {
  position: "relative",
  paddingBottom: "34%",
  font: "2vw sans-serif",
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

const ARROWS_CONTAINER_CSS = {
  flex: 3.33,
  font: "0.5em serif",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
}

const ARROW_ROW_CSS = {
  flex: 1,
  display: "flex",
  justifyContent: "space-around",
}

addCSSClass('keyboard-key', KEY_CSS);
addCSSClass('keyboard-container', CONTAINER_CSS);
addCSSClass('keyboard-all-rows', ALL_ROWS_CSS);
addCSSClass('keyboard-single-row', ROW_CSS);
addCSSClass('keyboard-key-command', COMMAND_KEYS_CSS);
addCSSClass('keyboard-key-number, .keyboard-key-special', TWO_SYMBOL_KEYS_CSS);
addCSSClass('keyboard-arrows-container', ARROWS_CONTAINER_CSS);
addCSSClass('keyboard-arrow-row', ARROW_ROW_CSS);

export default cssString;
