const { start } = require("repl");
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
       return this.connection.query("INSERT INTO department SET department_name = ? ", name)
   }
   createRole(roleObj){
       return this.connection.query("INSERT INTO title SET ?", roleObj)
    }
    createEmployee(empObj){
        return this.connection.query("INSERT INTO employee SET ?", empObj)
    }
    deleteDepartment(id){
        return this.connection.query("DELETE FROM department WHERE id = ?", id)
    }
    deleteRole(id){
        return this.connection.query("DELETE FROM title WHERE id = ?", id)
    }
    deleteEmployee(id){
        return this.connection.query("DELETE FROM employee WHERE id = ?", id)
    }
    updateDepartment(updatedDep){
        return this.connection.query("UPDATE department SET department_name WHERE id =? ", updatedDep)
    }
}
 module.exports = new DB(connection)