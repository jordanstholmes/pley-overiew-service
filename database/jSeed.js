const faker = require('faker');
const fs = require('fs');
const path = require('path');
// const db = require('./index.js');

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

const FOODCATEGORIES = ['drinks', 'food']; // 3/4th chance of food

// Split this up into modular functions
// Write to database/seedFiles

const seed = (numberOfInstances = 1) => {
  let name;
  let address;
  let cost;
  let phone;
  let website;
  let googleMap;
  const data = {
    restaurants: [],
    images: [],
  };

  // seeding the restaurants table
  for (let i = 0; i < numberOfInstances; i += 1) {
    name = faker.company.companyName();
    address = [faker.address.streetAddress(), faker.address.city(), faker.address.state(), faker.address.zipCode()].join(', ');
    cost = getRandomInt(5) + 1;
    phone = faker.phone.phoneNumberFormat();
    website = faker.internet.url();
    googleMap = `https://s3-us-west-1.amazonaws.com/yump-sf-overview/maps/${getRandomInt(5) + 1}.png`;
    data.restaurants.push({
      name,
      address,
      cost,
      phone,
      website,
      googleMap,
    });
  }
  return JSON.stringify(data.restaurants);

  // let user;
  // let description;
  // let date;
  // let category;
  // let restaurant;
  // let image;
  // // seeding the image table
  // for (let j = 0; j < 2000; j += 1) {
  //   user = faker.name.findName(); // Rowan Nikolaus
  //   description = faker.lorem.sentences();
  //   date = faker.date.recent();
  //   category = FOODCATEGORIES[getRandomInt(FOODCATEGORIES.length)];
  //   restaurant = getRandomInt(numberOfInstances) + 1;

  //   if (category === 'food') {
  //     image = `https://s3-us-west-1.amazonaws.com/yump-sf-overview/${randomCategory}/${getRandomInt(18) + 1}.jpg`;
  //   } else if (category === 'drinks') {
  //     image = `https://s3-us-west-1.amazonaws.com/yump-sf-overview/${randomCategory}/${getRandomInt(7) + 1}.jpg`;
  //   }
  // }
};

function createSeedWriter() {
  const destination = path.resolve(__dirname, `./seedFiles/testSeed${1}.json`);
  const stream = fs.createWriteStream(destination);
  let numberOfSeed = 1000000;

  const writer = () => {
    let result = true;
    while (result && numberOfSeed) {
      result = stream.write(seed(10));
      numberOfSeed -= 1;
    }
    if (numberOfSeed) {
      stream.once('drain', writer);
    }
  };
  return writer;
}

const writer = createSeedWriter();
writer();
// function writeSeedCSV() {
//   let stream;
//   if (!writeStream) {
//     const destination = path.resolve(__dirname, `./seedFiles/testSeed${1}.json`);
//     stream = fs.createWriteStream(destination);
//   } else {
//     stream = writeStream;
//   }
//   stream.write(seed(1));
//   stream.on('finish', () => {
//     console.log('wrote data to file');
//     if (iterations) {
//       writeSeedCSV(iterations - 1, stream);
//     } else {
//       writeStream.end();
//       console.log('finished all iterations!');
//     }
//   });
// }
// seed(100);

// setTimeout((() => process.exit()), 2000); // What does this do?
