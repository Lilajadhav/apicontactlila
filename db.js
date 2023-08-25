const mysql = require('mysql2/promise'); // Using mysql2 for promises

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'apiproj',
};

const db = mysql.createPool(dbConfig);

module.exports = db;
