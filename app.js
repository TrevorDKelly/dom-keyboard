let express = require('express');
let app = express();
let port = 3434;
let path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/keyboard.html'));
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, `/public/${req.params[0]}`));
});

app.listen(port);
