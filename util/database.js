const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 5,
    host: 'us-cdbr-iron-east-02.cleardb.net',
    user: 'be9394a8259f7d',
    password: '2d99e3cd', 
    database: 'heroku_b2ab74d850f095c'
});

module.exports = pool.promise();