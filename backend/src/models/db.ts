var mysql = require('mysql');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

//local mysql db connection
var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DBNAME
});

connection.connect(function(err: Error) {
    if (err) throw err;
});

export default connection;
