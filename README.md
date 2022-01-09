# DOM Keyboard
An in-browser representation of a keyboard built out of DOM nodes. It includes simple methods for interacting with key presses and making visual changes to the keyboard along side them

---

## Structure
`DOMKeyboard` object
`Key` object

---

## Initializing
Call the `DOMKeyboard` initializer with the width you want the keyboard to be and the DOM id you want it to have.

the keyboard object has a `node` property that returns the DOM node for the keybaord

```javascript
  const kb = new Keybaord("100%", "my-keyboard");
  document.body.appendChild(kb.node);
```

---

## `DOMKeyboard`

### Properties

#### `node`
The DOM `<div>` node holding the keyboard

#### `keys`
An array of all of the `Key` objects

### Methods

#### `getKey(str)` >> `Key`
takes a string as an argument and uses `Key.prototype.match` to return the first matching `Key`.

#### `onKeyDown([...matches], [callback]

---

## `Key`
