const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`${process.env.DB_URL}/overview`);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const imageSchema = mongoose.Schema({
  imageId: Number,
  userName: String,
  image: String,
  description: String,
  posted: Date,
  category: String,
});

const restaurantSchema = mongoose.Schema({
  restaurantId: Number,
  name: String,
  address: String,
  cost: Number,
  phone: String,
  website: String,
  googleMap: String,
  images: [imageSchema],
});

exports.Restaurant = db.model('restaurant', restaurantSchema);
// exports.Restaurant.findOne({ restaurantId: 2 }, (err, result) => {
//   if (err) return console.error(err);
//   return console.log(result);
// });
