# DOM Keyboard
An in-browser representation of a keyboard built out of DOM nodes. It includes simple methods for interacting with key presses and making visual changes to the keyboard along side them

---

## Structure
[`DOMKeyboard`](#domkb) object
  Properties
  -[node](#domkb-node)
  -[keys](#domkb-keys)
  Methods
  -[getKey](#domkb-getkey)
  -[onKeyDown](#domkb-onbeydown)
  -[onKeyUp](#domkb-onkeyup)
  -[press](#domkb-press)
  -[typeInto](#domkb-typeinto)
[`Key`](#key) object

---

## Initializing
Call the `DOMKeyboard` initializer with the width you want the keyboard to be and the DOM id you want it to have.

the keyboard object has a `node` property that returns the DOM node for the keybaord

```javascript
const kb = new Keybaord("100%", "my-keyboard");
document.body.appendChild(kb.node);
```

---

## <a name="domkb">`DOMKeyboard`</a>

### Properties

#### <a name="domkb-node">`node`</a>
The DOM `<div>` node holding the keyboard.

#### <a name="domkb-keys">`keys`</a>
An array of all of the `Key` objects.

### Methods

#### <a name="domkb-getkey">`getKey(str)` >> `Key`</a>
takes a string as an argument and uses `Key.prototype.match` to return the first matching `Key`.

#### <a name="domkb-onkeydown">`onKeyDown([...matches], callback)`</a>
Specifies a callback to execute when a matching key is pressed. The callback receives the matching `Key` object.
`matches` can be a string matching any property of a `Key` object, a series of such strings, or an array of such strings.
```javascript
kb.onKeyDown("t", (key) => console.log(key.code));
// When the "t" is pressed "KeyT" is logged

kb.onKeyDown("t", "R", "KeyE", (key) => console.log(key.code));
// When the "t", "r", or "e" is pressed, the callback is executed

kb.onKeyDown([["t", "R", "number"], (key) => console.log(key.code));
// When the "t", "r", or any number key is pressed, the callback is executed
```

#### <a name="domkb-onkeyup">`onKeyUp([...matches], callback)`</a>
Specifies a callback to execute when a matching key is released. The callback receives the matching `Key` object.
See `onKeyDown` for details.

#### <a name="domkb-press">`press(key, time = 100)`</a>
presses a key on the DOMKeyboard and releases it after `time` milliseconds.
`key` is a string that uses `Key.prototype.match` to find all matching keys.
A shift key will also be pressed if `key` matches the `shift` property of the matching key.
NOTE: the `press` method does not create a keypress event in the DOM.

#### <a name="domkb-typeinto">`typeInto(node, text)`</a>
Enters characters into `node` one character at a time while pressing the matching key on the DOMKeyboard. `DOMKeyboard.prototype.press` is used to press the keys.
`node` is a dom node.
`test` is a string that will be added one character at a time to the end of `nod`'s innerHTML

---

## <a name="key">`Key`</a>
