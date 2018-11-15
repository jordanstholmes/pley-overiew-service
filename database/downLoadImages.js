const axios = require('axios');
const fs = require('fs');
const path = require('path');

let index = 1;

function padIndex() {
  const zeroCount = 4 - index.toString().length;
  return Array(zeroCount).fill('0').join('') + index.toString();
}

async function downloadImage() {
  const destination = path.resolve(__dirname, `../../images/${padIndex()}.jpeg`);
  index += 1;

  const response = await axios({
    method: 'GET',
    url: 'https://loremflickr.com/220/220/food',
    responseType: 'stream',
  });

  if (index === 24) { console.log(response); }
  response.data.pipe(fs.createWriteStream(destination));

  return new Promise((resolve, reject) => {
    response.data.on('end', () => {
      resolve();
    });

    response.data.on('error', () => {
      reject();
    });
  });
}

function loop(iterations = 900) {
  downloadImage().then(() => {
    if (index <= iterations) {
      loop(iterations);
    }
  });
}

loop();
