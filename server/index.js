const express = require('express');
const path = require('path');
const morgan = require('morgan');
const db = require('../database/index.js');

const app = express();
const PORT = 9001;

app.use(morgan('dev'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.join(__dirname, '../public/')));
app.use(express.json());
app.use(express.urlencoded());

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/api/:id', (req, res) => {
  const theId = req.params.id;
  const data = {};

  db.query(`SELECT * from images WHERE images.restaurant = ${theId}`, (err, result) => {
    if (err) { throw err; }
    data.images = result;
    db.query(`SELECT * from restaurants WHERE id = ${theId}`, (err2, theData) => {
      if (err2) { throw err2; }
      data.restaurant = theData;
      res.send(data);
    });
  });
});

app.listen(PORT, console.log('Listening on port:', PORT));
