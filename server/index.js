const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const db = require('../database/mongoDb/index.js');
require('dotenv').config();

const app = express();
const { Restaurant } = db;

app.use(morgan('dev'));
app.use(cors());
app.use(express.static(path.join(__dirname, '../public/')));
app.use(express.urlencoded()); // Why is this here? Isn't it redundant after the previous line?

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// 5bf5bb6bde88b93f5705cdc4
app.get('/api/:id', (req, res) => {
  const { id } = req.params;
  Restaurant.findById(id, (err, restaurantData) => {
    if (err) {
      console.error(err);
      return res.sendStatus(404);
    }
    res.send(restaurantData);
  });
});

/* NEW API ROUTES BELOW */

app.post('/api/restaurants/', (req, res) => {
  const values = req.body;
  const restaurantVals = `"${values.name}", "${values.address}", "${values.phone}", "${values.website}", "${values.googleMap}", ${values.cost}`;
  // console.log(values);
  db.query(`INSERT INTO restaurants (${restaurantCols}) VALUES (${restaurantVals});`, (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  });
});

app.post('/api/restaurants/:restaurantId/images/', (req, res) => {
  const image = req.body;
  const imageValues = `"${image.user}", "${image.image}", "${image.description}", "${image.posted}", "${image.category}", ${req.params.restaurantId}`;
  db.query(`INSERT INTO images (${imageCols}) VALUES (${imageValues});`, (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  });
});

app.put('/api/restaurants/:identifier', (req, res) => {
  const { identifier } = req.params;
  const identifierColumn = Number(identifier) ? 'id' : 'name';
  const searchTerm = Number(identifier) ? identifier : `"${identifier}"`;
  const values = req.body;
  const colsToChange = Object.keys(req.body);
  const assignmentList = colsToChange.map((colName) => {
    const val = colName === 'cost' ? values[colName] : `"${values[colName]}"`;
    return `${colName} = ${val}`;
  }).join(', ');
  db.query(`UPDATE restaurants SET ${assignmentList} WHERE ${identifierColumn} = ${searchTerm};`, (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(202);
    }
  });
});

app.put('/api/images/:id', (req, res) => {
  const values = req.body;
  const colsToUpdate = Object.keys(values);
  const assignmentList = colsToUpdate.map((colName) => {
    const val = colName === 'restaurant' ? values[colName] : `"${values[colName]}"`;
    return `${colName} = ${val}`;
  }).join(', ');
  db.query(`UPDATE images SET ${assignmentList} WHERE id = ${req.params.id};`, (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(202);
    }
  });
});

app.delete('/api/restaurants/:identifier', (req, res) => {
  const { identifier } = req.params;
  const column = Number(identifier) ? 'id' : 'name';
  const searchTerm = Number(identifier) ? identifier : `"${identifier}"`;
  db.query(`DELETE FROM restaurants WHERE ${column}=${searchTerm}`, (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  });
});

app.delete('/api/images/:id', (req, res) => {
  db.query(`DELETE FROM images WHERE id =${req.params.id}`, (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  });
});

app.get('/api/restaurants/:identifier', (req, res) => {
  const { identifier } = req.params;
  const column = Number(identifier) ? 'id' : 'name';
  const searchTerm = Number(identifier) ? identifier : `"${identifier}"`;
  db.query(`SELECT * FROM restaurants WHERE ${column}=${searchTerm}`, (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(404);
    } else {
      res.send(results);
    }
  });
});

app.get('/api/images/:imageId', (req, res) => {
  db.query(`SELECT * FROM images WHERE id=${req.params.imageId}`, (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(404);
    } else {
      res.send(results);
    }
  });
});

app.listen(process.env.PORT, console.log('Listening on port:', process.env.PORT));
