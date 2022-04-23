# DOM Keyboard
An in-browser representation of a keyboard built out of DOM nodes. It includes simple methods for interacting with key presses and making visual changes to the keyboard along side them.

This project is open-source! Feel free to submit pull requests or suggest changes!

---

## Table of Contents
- [Initializing](#initializing)
  - [`options` object](#options)

- [`DOMKeyboard`](#domkb) object
  - Properties
    - [keys](#domkb-keys)
    - [node](#domkb-node)

  - Methods
    - [getKey](#domkb-getkey)
    - [onKeyDown](#domkb-onkeydown)
    - [onKeyUp](#domkb-onkeyup)
    - [press](#domkb-press)
    - [typeInto](#domkb-typeinto)

- [`Key`](#key) object
  - Properties
    - [character](#key-character)
    - [code](#key-code)
    - [node](#key-node)
    - [shift](#key-shift)
    - [side](#key-side)
    - [type](#key-type)
  - Methods
    - [down](#key-down)
    - [up](#key-down)
    - [match](#key-match)
    - [press](#key-press)
    - [style](#key-style)
---

## <a name="initializing">Initializing</a>
Call the `DOMKeyboard` constructor function with the width you want the keyboard to be, an optional `id` attribute, and an optional `options`<br>
The width must be a percentage<br>
The `id` will be the DOM id of the keyboard<br>
More on the `options` object below<br>

The keyboard object has a `node` property that returns the DOM node for the keybaord

```javascript
const kb = new DOMKeyboard("100%", "my-keyboard", [options]);
document.body.appendChild(kb.node);
```

### <a name="options">`options`</a>
A javascript object with the following optional properties:

- `reactToKeyPress`
boolean<br>
Default: `true`<br>
Determines if the keys of the DOMKeyboard are pressed when a user presses a key on their keybaord.

<em>(Currently there is only one option, more are set to be added in future updates)<em>

---

## <a name="domkb">`DOMKeyboard`</a>

### Properties

- <a name="domkb-keys">`keys`</a><br>
An array of all of the `Key` objects.

- <a name="domkb-node">`node`</a><br>
The DOM `<div>` node holding the keyboard.

### Methods

- <a name="domkb-getkey">`getKey(str)` >> `Key`</a><br>
Takes a string as an argument and uses `Key.prototype.match` to return the first matching `Key`.

- <a name="domkb-onkeydown">`onKeyDown([...matches], callback)`</a><br>
Specifies a callback to execute when a matching key is pressed on a user's keyboard. The callback receives the matching `Key` object.<br>
`matches` can be a string matching any property of a `Key` object, a series of such strings, or an array of such strings.<br>
  ```javascript
  kb.onKeyDown("t", (key) => console.log(key.code));
  // When the "t" is pressed "KeyT" is logged

  kb.onKeyDown("t", "R", "KeyE", (key) => console.log(key.code));
  // When the "t", "r", or "e" is pressed, the callback is executed

  kb.onKeyDown([["t", "R", "number"], (key) => console.log(key.code));
  // When the "t", "r", or any number key is pressed, the callback is executed
  ```

- <a name="domkb-onkeyup">`onKeyUp([...matches], callback)`</a><br>
Specifies a callback to execute when a matching key is released on a user's keyboard. The callback receives the matching `Key` object.<br>
See `onKeyDown` for details.

- <a name="domkb-press">`press(key, [time = 100])` >> `Promise`</a><br>
Presses a key on the DOMKeyboard and releases it after `time` milliseconds.<br>
The returned `Promise` is resolved after the key has been pressed and released in the DOMKeyboard.<br>
`key` is a string that uses `Key.prototype.match` to find all matching keys.<br>
A shift key will also be pressed if `key` matches the `shift` property of the matching key.<br>
NOTE: the `press` method does not create a keypress event in the DOM.

- <a name="domkb-typeinto">`typeInto(node, text, [speed = 100], [variability = 0], [callback])` >> `Promise`</a><br>
Enters characters into `node` one character at a time while pressing the matching key on the DOMKeyboard. `DOMKeyboard.prototype.press` is used to press the keys.<br>
`node` is a DOM node.<br>
`text` is a string that will be added one character at a time to the end of `node`'s innerHTML<br>
`speed` is the time between key presses in milliseconds<br>
`variability` is a time in milliseconds that the `speed` will randomly vary by to imitate inconsistent typing speed. If provided, a random number between `speed - variability` and `speed + variability` will be chosen for each key press. A `speed` must be specified in order to provide a `variability`<br>
`callback` is an optional function that is called as each key is pressed. It is passed the `Key` object that is being pressed as an argument.<br>
`speed`, `variability`, and `callback` are all optional. `callback` must be the last argument if provided.
The returned `Promise` is resolved after the full `text` has been typed into the `node`<br>


---

## <a name="key">`Key`</a>

### Properties

- <a name="key-character">`character`</a><br>
The main character for the key. A string.

- <a name="key-code">`code`</a><br>
The `KeyboardEvent.key` value for the key. A String

- <a name="key-node">`node`</a><br>
The DOM `<div>` node holding the key.

- <a name="key-shift">`shift`</a><br>
The character for if the key is pressed while shift is held. A String

- <a name="key-side">`side`</a><br>
The side of the keyboard that the key is on. Either the string "Left" or "Right"

- <a name="key-type">`type`</a><br>
The type of the key's `character`. A string.<br>
One of the following:
  - "letter"
  - "number"
  - "control"
  - "special"
  - "arrow"

### Methods

- <a name="key-down">`down([time = 100])` >> `Promise`</a><br>
Adds the `keyboard-key-down` CSS class to the key's node.<br>
The returned `Promise` is resolved after `time` milliseconds.

- <a name="key-up">`up([time = 100])` >> `Promise`</a><br>
Removes the `keyboard-key-down` CSS class to the key's node.<br>
The returned `Promise` is resolved after `time` milliseconds.

- <a name="key-match">`match(selected)` >> `boolean`</a><br>
Checks whether `selected` matches the key's `code`, `character`, `shift`, or `type` property<br>
`selected` can be a string or array of strings.

- <a name="key-press">`press([time = 100])` >> `Promise`</a><br>
Calls the `Key.prototype.down` method then delays `time` milliseconds before calling `Key.prototype.up`<br>
The returned `Promise` is resolved after the key down and key up animaition have finished.

- <a name="key-style">`style(cssStyle, newValue)`</a><br>
Sets inline styles on the key's node using it's DOM Style Object.<br>
To unset any added styles, set the value to `null`
```javascript
const t = kb.getKey("t");
t.style("backgroundColor", "red")
t.style("backgroundColor", null)
```
