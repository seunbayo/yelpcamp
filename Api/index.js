const express = require('express');
const pokemon = require('./pokemon');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  let onSuccess = (_response, body) => {
    res.render('index', { result: body });
  }
  let onError = error => res.send(error)
  pokemon.all(onSuccess, onError)
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)});
