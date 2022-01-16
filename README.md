# DOM Keyboard
An in-browser representation of a keyboard built out of DOM nodes. It includes simple methods for interacting with key presses and making visual changes to the keyboard along side them

---

## Table of Contents
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

## Initializing
Call the `DOMKeyboard` constructor function with the width you want the keyboard to be and the DOM id you want it to have.<br>
The keyboard object has a `node` property that returns the DOM node for the keybaord

```javascript
const kb = new Keybaord("100%", "my-keyboard");
document.body.appendChild(kb.node);
```

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
Specifies a callback to execute when a matching key is pressed. The callback receives the matching `Key` object.<br>
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
Specifies a callback to execute when a matching key is released. The callback receives the matching `Key` object.<br>
See `onKeyDown` for details.

- <a name="domkb-press">`press(key, time = 100)`</a><br>
presses a key on the DOMKeyboard and releases it after `time` milliseconds.<br>
`key` is a string that uses `Key.prototype.match` to find all matching keys.<br>
A shift key will also be pressed if `key` matches the `shift` property of the matching key.<br>
NOTE: the `press` method does not create a keypress event in the DOM.

- <a name="domkb-typeinto">`typeInto(node, text)`</a><br>
Enters characters into `node` one character at a time while pressing the matching key on the DOMKeyboard. `DOMKeyboard.prototype.press` is used to press the keys.<br>
`node` is a dom node.<br>
`test` is a string that will be added one character at a time to the end of `nod`'s innerHTML


---

## <a name="key">`Key`</a>

### Properties

- <a name="key-character">`chacracter`</a><br>
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

- <a name="key-down">`down()`</a><br>
Adds the `keyboard-key-down` CSS class to the key's node.

- <a name="key-up">`up()`</a><br>
Removes the `keyboard-key-down` CSS class to the key's node.

- <a name="key-match">`match(selected)` >> boolean</a><br>
Checks whether `selected` matches the key's `code`, `character`, `shift`, or `type` property<br>
`selected` can be a string or array of strings.

- <a name="key-press">`press(time = 100)`</a><br>
Calls the `Key.prototype.down` method then delays `time` milliseconds before calling `Key.prototype.up`

- <a name="key-style">`style(cssStyle, newValue)`</a><br>
Sets inline styles on the key's node using it's DOM Style Object.<br>
To unset any added styles, set the value to `null`
```javascript
const t = kb.getKey("t");
t.style("backgroundColor", "red")
t.style("backgroundColor", null)
```
