const faker = require('faker');
const fs = require('fs');
const path = require('path');
// const db = require('./index.js');
let restaurantId = 1;
let imageId = 1;
const BATCH_SIZE = 1000; // generally set to 1000
const NUMBER_OF_RESTAURANTS = 10000000;
const FOODCATEGORIES = ['drinks', 'food'];
const AVERAGE_IMAGES_PER_RESTAURANT = 10;
const IMAGE_INDICES_ON_AWS = 900;

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));
function padIndex(idx) {
  const zeroCount = 4 - idx.toString().length; // 4 because indexes go up to 1000 (4 digits)
  return Array(zeroCount).fill('0').join('') + idx.toString();
}

const seedRestaurants = (numberOfInstances = BATCH_SIZE) => {
  // schema: (N)id, name, address, phone, website, googleMap, (N)cost
  let csvLines = '';
  let name;
  let address;
  let cost;
  let phone;
  let website;
  let googleMap;
  // seeding the restaurants table
  for (let i = 0; i < numberOfInstances; i += 1) {
    // name
    name = faker.company.companyName();
    address = [faker.address.streetAddress(), faker.address.city(), faker.address.state(), faker.address.zipCode()].join(', ');
    cost = getRandomInt(5) + 1;
    phone = faker.phone.phoneNumberFormat();
    website = faker.internet.url();
    googleMap = `https://s3-us-west-1.amazonaws.com/yump-sf-overview/maps/${getRandomInt(5) + 1}.png`;
    csvLines += `"${restaurantId}","${name}","${address}","${phone}","${website}","${googleMap}","${cost}"\n`;
    restaurantId += 1;
  }
  return csvLines;
};

const seedImages = (numberOfInstances = BATCH_SIZE) => {
  let csvLines = '';
  let user;
  let description;
  let posted;
  let category;
  let restaurant;
  let image;
  // seeding the image table
  for (let j = 0; j < numberOfInstances; j += 1) {
    user = faker.name.findName(); // Rowan Nikolaus
    description = faker.lorem.sentences();
    posted = faker.date.recent();
    category = FOODCATEGORIES[getRandomInt(FOODCATEGORIES.length)];
    restaurant = getRandomInt(NUMBER_OF_RESTAURANTS) + 1;
    const paddedImgIdx = padIndex(getRandomInt(IMAGE_INDICES_ON_AWS + 1));
    image = `https://s3-us-west-1.amazonaws.com/sdc-overview-images/images/${paddedImgIdx}.jpeg`;
    csvLines += `"${imageId}","${user}","${image}","${description}","${posted}","${category}","${restaurant}"\n`;
    imageId += 1;
  }
  return csvLines;
};

function createSeedWriter(fileName, total, seedGenerator, cb) {
  let totalSeedEntries = total / BATCH_SIZE;
  const destination = path.resolve(__dirname, `./seedFiles/${fileName}`);
  const stream = fs.createWriteStream(destination);

  const writer = () => {
    let result = true;
    while (result && totalSeedEntries > 0) {
      result = stream.write(seedGenerator());
      totalSeedEntries -= 1;
    }
    if (totalSeedEntries > 0) {
      stream.once('drain', writer);
    } else if (totalSeedEntries <= 0 && cb) {
      console.log('Switching to images now...');
      cb();
    }
  };
  return writer;
}

const imageWriter = createSeedWriter('images.csv', NUMBER_OF_RESTAURANTS * AVERAGE_IMAGES_PER_RESTAURANT, seedImages);
const restaurantWriter = createSeedWriter('restaurants.csv', NUMBER_OF_RESTAURANTS, seedRestaurants, imageWriter);
restaurantWriter();
// imageWriter();
