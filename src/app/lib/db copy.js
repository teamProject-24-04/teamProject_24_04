const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'teamProject_24_04',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});
// 예시: 사용자 테이블에서 모든 사용자 정보를 가져오는 쿼리 실행
connection.query('SELECT * FROM products', (err, rows) => {
  if (err) {
    console.error('Error executing SQL query:', err);
    return;
  }
  console.log('Products:', rows);
});

export default db;
