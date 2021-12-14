let cssString = "";

function addCSSClass(name, styles) {
  let string = `.${name} {`;
  Object.keys(styles).forEach(attribute => {
    let value = styles[attribute];

    string += `${attribute}: ${value}; `;
  });

  cssString += string + "}\n";
};

const KEY_CSS = {
  "background-color": "black",
  "border-radius": "0.25em",
  "display": "flex",
  "justify-content": "center",
  "align-items": "center",
};

const CONTAINER_CSS = {
  "position": "relative",
  "padding-bottom": "34%",
  "font-size": "2.5vw",
  "color": "white",
};

const ALL_ROWS_CSS = {
  "position": "absolute",
  "top": 0,
  "bottom": 0,
  "left": 0,
  "right": 0,
  "display": "flex",
  "flex-direction": "column",
};

const ROW_CSS = {
  "display": "flex",
  "gap": "1%",
  "padding": "0.5%",
  "align-items": "stretch",
  "align-content": "stretch",
  "justify-content": "space-between",
  "height": "20%",
}

addCSSClass('keyboard-key', KEY_CSS);
addCSSClass('keyboard-container', CONTAINER_CSS);
addCSSClass('keyboard-all-rows', ALL_ROWS_CSS);
addCSSClass('keyboard-single-row', ROW_CSS);

export default cssString;
