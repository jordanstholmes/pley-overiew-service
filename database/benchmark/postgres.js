const Sequelize = require('sequelize');

const NUMBER_OF_QUERIES = 10;
const NANOS_PER_MILLI = 1000000;
const MAX_IMG_IDX = 100000000;

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

const Image = sequelize.define('images', {
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

async function getAverageQuerySpeed(numberOfQueries) {
  await sequelize
    .authenticate()
    .then(() => Restaurant.sync())
    .then(() => {
      console.log('Connection established!');
    });
  let totalms = 0;
  let totalSeconds = 0;
  let hrstart = process.hrtime();
  let hrend;
  let milliseconds;
  let seconds;

  function loop(numOfLoops) {
    hrstart = process.hrtime();
    Image.findAll({
      where: {
        id: getRandomIdFromEndOfDb(MAX_IMG_IDX),
      },
    })
      .then(() => {
        hrend = process.hrtime(hrstart);
        milliseconds = hrend[1] / NANOS_PER_MILLI;
        seconds = hrend[0];
        totalSeconds += seconds;
        totalms += milliseconds;
        console.log('Tests Remaining:', numOfLoops);
        console.log('Milliseconds:', milliseconds);
        console.log('Seconds should be 0:', totalSeconds);
        console.log('Average milliseconds:', totalms / (numberOfQueries - numOfLoops));
        if (numOfLoops > 0) {
          loop(numOfLoops - 1);
        }
      })
      .catch(err => console.error(err));
  }
  loop(numberOfQueries);
}

getAverageQuerySpeed(NUMBER_OF_QUERIES);

// let hrstart = process.hrtime();
// sequelize
//   .authenticate()
//   .then(() => Restaurant.sync())
//   .then(() => {
//     console.log('Connection established!');
//     console.log(process.hrtime(hrstart)[1] / 1000000);
//   })
//   .then(() => {
//     hrstart = process.hrtime();
//     return Image.findAll({
//       where: {
//         id: 98999999,
//       },
//     });
//   })
//   .then((result) => {
//     const end = process.hrtime(hrstart);
//     console.log('SECONDS:', end[0], 'MILLISECONDS:', end[1] / 1000000);
//     console.log('RESULT', result);
//   });
//   .then(() => {
//     hrstart = process.hrtime();
//     return Restaurant.findAll({
//       where: {
//         id: 9999999,
//         phone: '677-614-0980',
//         website: 'http://martina.net',
//         // name: 'Gislason - Osinski',
//       },
//     });
//   })
//   .then((result) => {
//     const end = process.hrtime(hrstart);
//     console.log('SECONDS:', end[0], 'MILLISECONDS:', end[1] / 1000000);
//     console.log(result);
//     console.log('Matches:', result.length);
//   })
//   .catch(err => console.error('Things did not go to plan...', err));
