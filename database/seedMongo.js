/*
Create
10000 restaurants
each with 10 images
for 100000
Add them to mongo (time it)
Multiply by 1000
*/
const { MongoClient, ObjectID } = require('mongodb');
const generator = require('./createMongoDoc.js');


const client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });
let db;
let Restaurants;

function insert(error, cb) {
  if (error) return console.error(error);
  Restaurants.insertMany(generator.createRestaurants(100000), (err, results) => {
    if (err) {
      cb(err);
    } else {
      cb(null, results);
    }
  });
}

function retrieve(error, cb) {
  if (error) return console.error(error);
  Restaurants.find({ _id: ObjectID('5bf0a2d2f782e3195cdbe4d0') }).toArray((err, docs) => {
    if (err) return console.error(err);
    return console.log(docs[0].images[3]);
  });
}

client.connect((err) => {
  if (err) return console.error(err);
  db = client.db('overview');
  Restaurants = db.collection('restaurants');
  const start = process.hrtime();
  let end;
  insert(null, () => {
    end = process.hrtime(start);
    console.log('Inserted in', end[0], 'SECONDS and', end[1], 'NANOSECONDS');
    client.close();
  });
  // retrieve();
});
