var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'birdie-test.cyosireearno.eu-west-2.rds.amazonaws.com',
    user     : 'test-read',
    password : 'xnxPp6QfZbCYkY8',
    database : 'birdietest'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
