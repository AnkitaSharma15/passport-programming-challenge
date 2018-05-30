const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
  connection.query("CREATE DATABASE Node", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});
