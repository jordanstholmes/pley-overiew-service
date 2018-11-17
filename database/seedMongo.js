/*
Create
10000 restaurants
each with 10 images
for 100000
Add them to mongo (time it)
Multiply by 1000
*/
const seed = require()
const { MongoClient } = require('mongodb');

const db;
const client = new MongoClient('mongodb://localhost:27017');
client.connect((err) => {
  if (err) return console.error(err);
  db = client.db('overview');
});