const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    password: 'mysql', 
    database: 'carrie'
});

module.exports = pool.promise();