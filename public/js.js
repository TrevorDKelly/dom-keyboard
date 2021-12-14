import JSKeyboard from "/javascripts/keyboard.js";

document.addEventListener("DOMContentLoaded", function() {
  let keyboard = new JSKeyboard("100%");
  document.body.appendChild(keyboard.node);
});


