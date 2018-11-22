const { MongoClient } = require('mongodb');

function initializeMongoConnection() {
  return new Promise((resolve, reject) => {
    const client = new MongoClient(process.env.DB_URL, { useNewUrlParser: true });
    client.connect((err) => {
      if (err) {
        reject(err);
      } else {
        console.log('Mongo Connection established!');
        const collection = client.db('overview').collection('restaurants');
        resolve({ client, collection });
      }
    });
  });
}

initializeMongoConnection();
exports.initializeMongoConnection = initializeMongoConnection;
