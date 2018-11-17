const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

const { Op } = Sequelize;

let entriesFromFile;
let insertIdx = -1;
const NUMBER_OF_QUERIES = 1000;
const NANOS_PER_MILLI = 1000000;
const MAX_IMG_IDX = 100000000;
let deleteIdx = 10000000;

const sequelize = new Sequelize('overview', 'jordanholmes', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    createdAt: 'createdat',
    updatedAt: 'updatedat',
  },
  operatorsAliases: false,
});

const Restaurant = sequelize.define('restaurant', {
  name: Sequelize.STRING(50),
  address: Sequelize.STRING,
  phone: Sequelize.STRING(50),
  website: Sequelize.STRING(2083),
  googlemap: Sequelize.STRING(2083),
  cost: Sequelize.INTEGER,
});

const Image = sequelize.define('image', {
  // id: {
  //   primaryKey: true,
  //   type: Sequelize.INTEGER,
  // },
  user_name: Sequelize.STRING(50),
  image: Sequelize.STRING(2083),
  description: Sequelize.STRING(5000),
  posted: Sequelize.STRING(255),
  category: Sequelize.ENUM('food', 'drinks'),
});

Image.belongsTo(Restaurant, { foreignKey: 'restaurant_id' });

function getRandomIdFromEndOfDb(lastIdx) {
  const maxIdx = lastIdx;
  const minIdx = lastIdx - Math.floor(lastIdx * 0.1);
  return Math.floor(Math.random() * (maxIdx - minIdx)) + minIdx;
}


async function getAverageQuerySpeed(numberOfQueries, queryFunc) {
  await sequelize
    .authenticate()
    .then(() => Restaurant.sync())
    .then(() => {
      console.log('Connection established!');
    });
  let totalms = 0;
  let totalSeconds = 0;
  let loopsDone = 0;
  let hrstart;
  let hrend;
  let milliseconds;
  let seconds;

  function loop() {
    hrstart = process.hrtime();
    queryFunc()
      .then((result) => {
        hrend = process.hrtime(hrstart);
        milliseconds = hrend[1] / NANOS_PER_MILLI;
        seconds = hrend[0];
        totalSeconds += seconds;
        totalms += milliseconds;
        loopsDone += 1;
        console.log(result.length, 'items were returned');
        console.log('TEST:', loopsDone);
        console.log('Seconds:', totalSeconds);
        console.log('Milliseconds:', milliseconds);
        console.log('Average milliseconds:', totalms / loopsDone);
        if (loopsDone < numberOfQueries) {
          loop();
        } else {
          sequelize.close();
        }
      })
      .catch(err => console.error(err));
  }
  loop(numberOfQueries);
}

function getImages() {
  const MAX_RESTAURANT_IDX = 10000000;
  return Image.findAll({
    where: {
      restaurant_id: getRandomIdFromEndOfDb(MAX_RESTAURANT_IDX),
    },
  });
}

function getImage() {
  return Image.findAll({
    where: {
      id: getRandomIdFromEndOfDb(MAX_IMG_IDX),
    },
  });
}

function insertImage() {
  insertIdx += 1;
  return Image.create(entriesFromFile[insertIdx]);
}

function createImageDeleter() {
  let startIdx = MAX_IMG_IDX - NUMBER_OF_QUERIES;
  const endIdx = MAX_IMG_IDX;

  return () => {
    if (startIdx > endIdx) {
      return console.log('Cannot delete higher than max idx');
    }
    startIdx += 1;
    return Image.destroy({
      where: {
        id: startIdx,
      },
    });
  };
}

function deleteRestaurant() {
  deleteIdx -= 1;
  return Restaurant.destroy({
    where: {
      id: deleteIdx,
    },
  });
}

async function readImagesFromFile(cb) {
  fs.readFile(path.resolve(__dirname, 'savedImageRecords.json'), 'utf8', (err, results) => {
    if (err) return console.error(err);
    entriesFromFile = JSON.parse(results);
    return cb();
  });
}

function writeLastImagesToFile(numberOfImages) {
  const startIdx = 100000000 - numberOfImages;
  Image.findAll({
    where: {
      id: {
        [Op.gt]: startIdx,
      },
    },
  })
    .then((results) => {
      const data = results.reduce((acc, { dataValues }) => {
        acc.push(dataValues);
        return acc;
      }, []);
      fs.writeFile(path.resolve(__dirname, 'savedImageRecords.json'), JSON.stringify(data), (err) => {
        if (err) {
          return console.error(err);
        }
        return console.log('Images file written');
      });
    });
}

function writeLastRestaurantsToFile(numberOfRecords) {
  const startIdx = 10000000 - numberOfRecords;
  Restaurant.findAll({
    where: {
      id: {
        [Op.gt]: startIdx,
      },
    },
  })
    .then((results) => {
      const data = results.reduce((acc, { dataValues }) => {
        acc.push(dataValues);
        return acc;
      }, []);
      fs.writeFile(path.resolve(__dirname, 'savedRestaurantRecords.json'), JSON.stringify(data), (err) => {
        if (err) {
          return console.error(err);
        }
        return console.log('Images file written');
      });
    });
}

function insertImagesFromFile() {
  fs.readFile(path.resolve(__dirname, 'savedImageRecords.json'), 'utf8', (err, results) => {
    if (err) return console.error(err);
    const data = JSON.parse(results);
    Image.bulkCreate(data)
      .then(() => console.log('finished instering from file'))
      .catch(error => console.error(error));
  });
}

// writeLastImagesToFile(1000);
// getAverageQuerySpeed(NUMBER_OF_QUERIES, createImageDeleter());
// insertImagesFromFile();

readImagesFromFile(() => {
  getAverageQuerySpeed(NUMBER_OF_QUERIES, deleteRestaurant);
});

// writeLastRestaurantsToFile(100);

