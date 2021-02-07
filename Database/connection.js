const mysql = require("mysql");
require ("dotenv").config()
const util = require("util");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password:"B1gB@dB3llig3r@nt",
    database: "employees_DB"
});

connection.connect(function (err) {
    if (err) {console.log(err.stack);
    return ;
    }
    console.log("connected as:"+ connection.threadId);
});

connection.query = util.promisify(connection.query);

module.exports = connection;