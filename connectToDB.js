const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
  //   password: '',
    database: 'spanish_vocab'
  })

  module.exports = connection;