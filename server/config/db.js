const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Z12X34D8s',
  database: 'docreater',
});

module.exports = pool.promise();
