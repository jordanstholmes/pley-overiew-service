exports.imageSettings = {
  imagesPerRestaurant: 10,
  csvMode: false,
  maxRestaurantIdx: 10000000,
  totalImgsOnS3: 900,
  categories: ['drinks', 'food'],
};

exports.restaurantSettings = {
  csvMode: false,
  maxCostRating: 5,
  maxGoogleMapIdx: 5,
  imageSettings: exports.imageSettings,
};
