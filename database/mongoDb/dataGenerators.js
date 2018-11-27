const faker = require('faker');
const { imageSettings, restaurantSettings } = require('../seedSettings.js');

const getRandomInt = max => Math.floor(Math.random() * max) + 1;
const createIdIncrementer = (start) => {
  let id = start;
  return () => {
    const currentId = id;
    id += 1;
    return currentId;
  };
};

const padIndex = (idx, desiredLength = 4) => {
  const zeroCount = desiredLength - idx.toString().length;
  return Array(zeroCount).fill('0').join('') + idx.toString();
};
const imageIncrementer = createIdIncrementer(34610001);
const generateUserName = () => faker.name.findName();
const generateDescription = () => faker.lorem.sentences();
const generatePostedDate = () => faker.date.recent();
const generateCategory = categories => categories[getRandomInt(categories.length) - 1];
const generateImageUrl = (totalImgsOnS3) => {
  const paddedIdx = padIndex(getRandomInt(totalImgsOnS3));
  return `https://s3-us-west-1.amazonaws.com/sdc-overview-images/images/${paddedIdx}.jpeg`;
};

exports.generateImages = () => {
  const { imagesPerRestaurant, totalImgsOnS3, categories } = imageSettings;
  const imagesArr = [];

  for (let j = 0; j < imagesPerRestaurant; j += 1) {
    const imageObj = {
      imageId: imageIncrementer(),
      userName: generateUserName(),
      image: generateImageUrl(totalImgsOnS3),
      description: generateDescription(),
      posted: generatePostedDate(),
      category: generateCategory(categories),
    };
    imagesArr.push(imageObj);
  }
  return imagesArr;
};

const restaurantIncrementer = createIdIncrementer(6922001);
const generateRestaurantName = () => faker.company.companyName();
const generateAddress = () => [
  faker.address.streetAddress(),
  faker.address.city(),
  faker.address.state(),
  faker.address.zipCode(),
].join(', ');
const generateCostRating = maxRating => getRandomInt(maxRating);
const generatePhoneNum = () => faker.phone.phoneNumberFormat();
const generateWebsite = () => faker.internet.url();
const generateGoogleMapImg = maxIdx => `https://s3-us-west-1.amazonaws.com/yump-sf-overview/maps/${getRandomInt(maxIdx)}.png`;

exports.generateRestaurant = () => {
  const { maxCostRating, maxGoogleMapIdx } = restaurantSettings;

  const restaurantObj = {
    restaurantId: restaurantIncrementer(),
    name: generateRestaurantName(),
    address: generateAddress(),
    cost: generateCostRating(maxCostRating),
    phone: generatePhoneNum(),
    website: generateWebsite(),
    googleMap: generateGoogleMapImg(maxGoogleMapIdx),
    images: exports.generateImages(),
  };
  return restaurantObj;
};

exports.getRandomInt = getRandomInt;
