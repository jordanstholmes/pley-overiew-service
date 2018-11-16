const axios = require('axios');
const fs = require('fs');
const path = require('path');

const NUMBER_OF_IMAGES = 900;
const IMG_WIDTH = 800;
const IMG_HEIGHT = 450;
let index = 501;

function padIndex() {
  const zeroCount = 4 - index.toString().length;
  return Array(zeroCount).fill('0').join('') + index.toString();
}

async function downloadImage() {
  const destination = path.resolve(__dirname, `./seedFiles/images/${padIndex()}.jpeg`);
  index += 1;

  const response = await axios({
    method: 'GET',
    url: `https://loremflickr.com/${IMG_WIDTH}/${IMG_HEIGHT}/food`,
    responseType: 'stream',
  });

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

function loop(iterations = NUMBER_OF_IMAGES) {
  downloadImage().then(() => {
    if (index <= iterations) {
      loop(iterations);
    }
  });
}

loop();
