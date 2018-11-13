const mysql = require('mysql');

// const connection = mysql.createConnection({
//   host: '172.17.0.2',
//   port: '3306',
//   user: 'root',
//   password: 'test',
//   database: 'overview',
// });

// connection.connect((err) => {
//   if (err) { throw err; }
//   console.log('CONNECTED!')
// });

const pool = mysql.createPool({
  host: 'localhost',
  // port: '3306',
  user: 'root',
  password: '',
  database: 'overview',
});


module.exports = pool;

//multiple statements