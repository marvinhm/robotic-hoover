let fs = require('fs');
var express = require('express');
var app = express();

let myData = fs.readFileSync('input.txt', 'utf8');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {

  res.write(myData);

  res.end();
});

app.listen(5555, () => console.log('listening on port 5555!'));