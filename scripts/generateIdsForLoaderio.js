/* Remember to upload the file to s3 and then add it to the test, see:
https://support.loader.io/article/17-payload-files
*/
const fs = require('fs');

const getRandomIntBetween = (min, max) => {
  const difference = max - min;
  return Math.floor(Math.random() * difference) + min;
};

const data = {
  version: 1,
  variables: [{
    names: ['restaurantId'],
    values: [],
  }],
};

/*
95% of these ids will be in the last 5% of my database
*/
for (let i = 1; i <= 10000; i += 1) {
  if (i % 20 === 0) {
    data.variables[0].values.push([getRandomIntBetween(1, 9500000)]);
  } else {
    data.variables[0].values.push([getRandomIntBetween(9500000, 10000000)]);
  }
}

fs.writeFile('./temp/loader-io-test-ids.json', JSON.stringify(data), (err) => {
  if (err) return console.error(err);
  return console.log('finished writing loader.io test ids file');
});
