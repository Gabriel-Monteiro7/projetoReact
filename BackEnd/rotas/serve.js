const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'transportadora'
});

connection.connect((error)=>{
    if(error)
        return error;
});

module.exports = connection;