const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('../database/mongoDb/index.js');
require('dotenv').config();


const app = express();
const { Restaurant } = db;

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public/')));

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/api/:id', (req, res) => {
  const { id } = req.params;
  Restaurant.findOne({ restaurantId: id }, (err, restaurantData) => {
    if (err) {
      console.error(err);
      return res.sendStatus(404);
    }
    return res.send(restaurantData);
  });
});

/* NEW API ROUTES BELOW */

// const imageSchema = mongoose.Schema({
//   imageId: Number,
//   userName: String,
//   image: String,
//   description: String,
//   posted: Date,
//   category: String,
// });

app.post('/api/restaurants/', (req, res) => {
  const restaurantData = req.body;
  console.log(restaurantData);
  Restaurant.create(restaurantData, (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  });
});

app.post('/api/restaurants/:id/images/', (req, res) => {
  const { id } = req.params;
  const image = req.body;
  Restaurant.findOneAndUpdate({ restaurantId: id }, { $push: { images: image } }, (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  });
});

app.put('/api/restaurants/:id', (req, res) => {
  const { id } = req.params;
  Restaurant.findOneAndUpdate({ restaurantId: id }, req.body, (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(202);
    }
  });
});

app.put('/api/restaurants/:restaurantId/images/:imageId', (req, res) => {
  const { restaurantId, imageId } = req.params;
  const newImageData = req.body;
  const querySelector = { restaurantId, 'images.imageId': imageId };
  const updates = Object.keys(newImageData).reduce((acc, key) => {
    acc[`images.$.${key}`] = newImageData[key];
    return acc;
  }, {});
  Restaurant.findOneAndUpdate(querySelector, updates, (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(202);
    }
  });
});

// app.delete('/api/restaurants/:id', (req, res) => {
//   const { identifier } = req.params;
//   const column = Number(identifier) ? 'id' : 'name';
//   const searchTerm = Number(identifier) ? identifier : `"${identifier}"`;
//   db.query(`DELETE FROM restaurants WHERE ${column}=${searchTerm}`, (err) => {
//     if (err) {
//       console.error(err);
//       res.sendStatus(404);
//     } else {
//       res.sendStatus(200);
//     }
//   });
// });

// app.delete('/api/images/:id', (req, res) => {
//   db.query(`DELETE FROM images WHERE id =${req.params.id}`, (err, results) => {
//     if (err) {
//       console.error(err);
//       res.sendStatus(404);
//     } else {
//       res.sendStatus(200);
//     }
//   });
// });

app.get('/api/restaurants/:id', (req, res) => {
  const { id } = req.params;
  Restaurant.findOne({ restaurantId: id }, (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(404);
    } else {
      res.send(results);
    }
  });
});

app.get('/api/restaurants/:restaurantId/images/:imageId', (req, res) => {
  console.log('I got hit');
  const { restaurantId, imageId } = req.params;
  const documentSelector = { restaurantId };
  const imageMatcher = { images: { $elemMatch: { imageId } } };
  Restaurant.findOne(documentSelector, imageMatcher, (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(404);
    } else {
      res.send(results);
    }
  });
});

app.listen(process.env.PORT, console.log('Listening on port:', process.env.PORT));
