const express = require('express');
const path = require('path');
const morgan = require('morgan');
const db = require('../database/index.js');

const app = express();
const PORT = 9001;
const restaurantCols = 'name, address, phone, website, googleMap, cost';
const imageCols = 'user, image, description, posted, category, restaurant';

app.use(morgan('dev'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.static(path.join(__dirname, '../public/')));
app.use(express.json());
app.use(express.urlencoded()); // Why is this here? Isn't it redundant after the previous line?

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/api/:identifier', (req, res) => {
  const { identifier } = req.params;
  const identifierColumn = Number(identifier) ? 'id' : 'name';
  const searchTerm = Number(identifier) ? identifier : `"${identifier}"`;
  const data = {};
  db.query(`SELECT * FROM restaurants WHERE ${identifierColumn}=${searchTerm}`, (err, restaurantData) => {
    if (err) {
      console.error(err);
      return res.sendStatus(404);
    }
    data.restaurant = restaurantData;
    db.query(`SELECT * from images WHERE images.restaurant = ${data.restaurant[0].id}`, (err2, imagesData) => {
      if (err2) {
        return console.error(err2);
      }
      data.images = imagesData;
      res.send(data);
    });
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

app.listen(PORT, console.log('Listening on port:', PORT));
