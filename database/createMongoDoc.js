const faker = require('faker');

const FOODCATEGORIES = ['drinks', 'food'];
const AVERAGE_IMAGES_PER_RESTAURANT = 10;
const IMAGE_INDICES_ON_AWS = 900;


const getRandomInt = max => Math.floor(Math.random() * (max + 1));
function padIndex(idx) {
  const zeroCount = 4 - idx.toString().length; // 4 because indexes go up to 1000 (4 digits)
  return Array(zeroCount).fill('0').join('') + idx.toString();
}

const createImages = (numberToCreate = AVERAGE_IMAGES_PER_RESTAURANT) => {
  let userName;
  let description;
  let posted;
  let category;
  let image;
  const images = [];
  // seeding the image table
  for (let j = 0; j < numberToCreate; j += 1) {
    userName = faker.name.findName(); // Rowan Nikolaus
    description = faker.lorem.sentences();
    posted = faker.date.recent();
    category = FOODCATEGORIES[getRandomInt(FOODCATEGORIES.length)];
    const paddedImgIdx = padIndex(getRandomInt(IMAGE_INDICES_ON_AWS - 1) + 1);
    image = `https://s3-us-west-1.amazonaws.com/sdc-overview-images/images/${paddedImgIdx}.jpeg`;
    images.push({
      userName,
      description,
      posted,
      category,
      image,
    });
  }
  return images;
};

const createRestaurants = (numberOfInstances) => {
  let name;
  let address;
  let cost;
  let phone;
  let website;
  let googleMap;
  let images = [];
  const restaurants = [];
  for (let i = 0; i < numberOfInstances; i += 1) {
    name = faker.company.companyName();
    address = [faker.address.streetAddress(), faker.address.city(), faker.address.state(), faker.address.zipCode()].join(', ');
    cost = getRandomInt(5);
    phone = faker.phone.phoneNumberFormat();
    website = faker.internet.url();
    googleMap = `https://s3-us-west-1.amazonaws.com/yump-sf-overview/maps/${getRandomInt(5)}.png`;
    images = createImages();
    restaurants.push({
      name,
      address,
      cost,
      phone,
      website,
      googleMap,
      images,
    });
  }
  return restaurants;
};

exports.createRestaurants = createRestaurants;
