

let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'alim',
    password: 'alim',
    database: 'tutoriel',
});

connection.connect();
module.exports = connection;
