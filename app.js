let express = require('express');
let app = express();
let port = 3434;
let path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/keyboard.html'));
});

app.get('/:file', (req, res) => {
  res.sendFile(path.join(__dirname, `./public/${req.params.file}`));
});

app.get('/modules/:file', (req, res) => {
  res.sendFile(path.join(__dirname, `./public/modules/${req.params.file}`));
});

app.listen(port);
