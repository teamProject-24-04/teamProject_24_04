//src/app/lib/db.js

import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'teamProject_24_04',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
