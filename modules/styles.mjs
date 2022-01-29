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

const CLASSES = {};

CLASSES["keyboard-key-up"] = {
  backgroundColor: "black",
  borderRadius: "0.25em",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderBottom: "0.3vw solid grey",
  boxShadow: "-0.2vw 0.2vw lightskyblue",
}

CLASSES["keyboard-key-down"] = {
  position: 'relative',
  top: "0.2vw",
  left: "-0.1vw",
  boxShadow: "0 0 lightskyblue",
  borderBottom: "0 solid grey",
  transition: "all 0.1s",
}

CLASSES["keyboard-key-control"] = {
  fontSize: "0.6em",
  flexDirection: "column",
  justifyContent: "space-around",
}

CLASSES["keyboard-container"] = {
  fontFamily: "sans-serif",
  position: "relative",
  color: "white",
};

CLASSES["keyboard-sizing-container"] = {
  paddingBottom: "34%",
}

CLASSES["keyboard-all-rows"] = {
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: "flex",
  flexDirection: "column",
};

CLASSES["keyboard-single-row"] = {
  display: "flex",
  gap: "1%",
  padding: "0.5%",
  alignItems: "stretch",
  alignContent: "stretch",
  justifyContent: "space-between",
  height: "20%",
}

CLASSES["keyboard-arrows-container"] = {
  flex: 3.33,
  font: "0.5em serif",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
}

CLASSES["keyboard-arrow-row"] = {
  flex: 1,
  display: "flex",
  justifyContent: "space-around",
}

const TWO_SYMBOL_KEYS_CSS = {
  flexDirection: "column",
  justifyContent: "space-around",
}

addCSSClass('keyboard-key-number, .keyboard-key-special', TWO_SYMBOL_KEYS_CSS);

const Style = {};

Style.createCSS = function(width) {
  CLASSES["keyboard-container"].width = width;

  Object.keys(CLASSES).forEach(cssClass => {
    addCSSClass(cssClass, CLASSES[cssClass]);
  });

  let style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = cssString;
  document.head.appendChild(style);
};

export default Style;
