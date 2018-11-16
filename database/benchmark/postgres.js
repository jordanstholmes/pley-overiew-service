const Sequelize = require('sequelize');

const sequelize = new Sequelize('overview', 'jordanholmes', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,
});

const hrstart = process.hrtime();
let hrend;
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection established!');
    console.log(process.hrtime(hrstart)[1] / 1000000);
  })
  .catch((err) => {
    console.error('Unable to connect', err);
  });
