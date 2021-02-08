const connection = require("./connection");
class DB {
    constructor(connection) {
        this.connection = connection;

    }
   viewDepartments(){
       return this.connection.query("SELECT * FROM department")
   }
   viewRole(){
       return this.connection.query("SELECT * FROM title")
   }
   viewEmployee(){
       return this.connection.query("SELECT * FROM employee")
   }
   createDepartment(name){
       return this.connection.query("INSERT INTO department SET ?", name)
   }
} 
module.exports = new DB(connection);