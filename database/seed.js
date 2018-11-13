const faker = require('faker');
const db = require('./index.js');

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

const FOODCATEGORIES = ['food', 'drinks', 'food', 'food']; // 3/4th chance of food

const seed = (restaurants = 100) => {
  let randomName;
  let randomAddress;
  let randomCost;
  let randomPhone;
  let randomWebsite;
  let randomGoogleMap;
  let query;

  // seeding the restaurants table
  for (let i = 0; i < restaurants; i += 1) {
    randomName = faker.company.companyName();
    randomAddress = [faker.address.streetAddress(), faker.address.city(), faker.address.state(), faker.address.zipCode()].join(', ');
    randomCost = getRandomInt(5) + 1;
    randomPhone = faker.phone.phoneNumberFormat();
    randomWebsite = faker.internet.url();
    randomGoogleMap = `https://s3-us-west-1.amazonaws.com/yump-sf-overview/maps/${getRandomInt(5) + 1}.png`;

    query = 'INSERT INTO restaurants (name, address, cost, phone, website, googleMap) VALUE(?, ?, ?, ?, ?, ?);';

    db.query(query, [randomName, randomAddress, randomCost,
      randomPhone, randomWebsite, randomGoogleMap], (err) => {
      if (err) { console.log(err); }
    });
  }

  let randomUser;
  let randomDescription;
  let randomDate;
  let randomCategory;
  let randomRestaurant;
  let randomImage;
  let query2;
  // seeding the image table
  for (let j = 0; j < 2000; j += 1) {
    randomUser = faker.name.findName(); // Rowan Nikolaus
    randomDescription = faker.lorem.sentences();
    randomDate = faker.date.recent();
    randomCategory = FOODCATEGORIES[getRandomInt(FOODCATEGORIES.length)];
    randomRestaurant = getRandomInt(restaurants) + 1;

    if (randomCategory === 'food') {
      randomImage = `https://s3-us-west-1.amazonaws.com/yump-sf-overview/${randomCategory}/${getRandomInt(18) + 1}.jpg`;
    } else if (randomCategory === 'drinks') {
      randomImage = `https://s3-us-west-1.amazonaws.com/yump-sf-overview/${randomCategory}/${getRandomInt(7) + 1}.jpg`;
    }
    query2 = 'INSERT INTO images (user, description, posted, category, restaurant, image) VALUE(?, ?, ?, ?, ?, ?);';
    // change to csv for back-end project
    db.query(query2, [randomUser, randomDescription, randomDate, randomCategory,
      randomRestaurant, randomImage], (err) => {
      if (err) { console.log('ERROR', err); }
    });
  }
};

seed(100);

setTimeout((() => process.exit()), 2000);
