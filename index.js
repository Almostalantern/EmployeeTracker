const mysql = require("mysql");
const inquirer = require("inquirer");

const DB = require("./Database/DB")

function start() {
    inquirer
        .prompt({
            name: "empTrack",
            type: "list",
            message: "Would you like to [ADD] an employee, role or department? [VIEW] Employees, role or department or [UPDATE] an employee, role, or department?",
            choices: ["ADD", "VIEW", "UPDATE", "DELETE", "GOODBYE"]

        })
        .then(function (answer) {
            if (answer.empTrack === "ADD") {
                addFunc();
            }
            else if (answer.empTrack === "VIEW") {
                viewFunc();
            }
            else if (answer.empTrack === "UPDATE") {
                updateFunc();
            }
            else if (answer.empTrack === "DELETE"){
                deleteFunc();
            }
            else if (answer.empTrack === "GOODBYE") {
                connection.end();
            }
        });
}
function addFunc() {
    inquirer
        .prompt({
            name: "addData",
            type: "list",
            message: "Would you like to add an [EMPLOYEE], [ROLE], [DEPARTMENT], or go back?",
            choices: ["EMPLOYEE", "ROLE", "DEPARTMENT", "GO BACK"]
        })
        .then(function (answer) {
            if (answer.addData === "EMPLOYEE") {
                empAdd();
            }
            else if (answer.addData === "ROLE") {
                addRole()
            }
            
            else if (answer.addData === "DEPARTMENT") {
                inquirer.prompt([{
                    type: "input",
                    name: "departmentName",
                    message: "What is this department called?"
                }]).then(function (answer) {
                    DB.createDepartment(answer.departmentName)
                        .then(console.log("Created new department:" + answer.departmentName));
                })
            }
            else {
                start();
            }
        })
}
function viewFunc() {
    inquirer
        .prompt({
            name: "viewData",
            type: "list",
            message: "Would you like to view an [EMPLOYEE], [ROLE], [DEPARTMENT], or go back?",
            choices: ["EMPLOYEE", "ROLE", "DEPARTMENT", "GO BACK"]
        })
        .then(function (answer) {
            if (answer.viewData === "EMPLOYEE") {
               DB.viewEmployee().then(function(res){
                   console.log(res)
               })
               start()
            }
            else if (answer.viewData === "ROLE") {
                DB.viewRole().then(function (res) {
                    console.log(res)
                })
                start();
            }
            else if (answer.viewData === "DEPARTMENT") {
                DB.viewDepartments().then(function (res) {
                    console.log(res)
                });
                start();
            }
            else {
                start();
            }
        })
}
function updateFunc() {
    inquirer
        .prompt({
            name: "updateData",
            type: "list",
            message: "Would you like to update an [EMPLOYEE], [ROLE], [DEPARTMENT], or go back?",
            choices: ["EMPLOYEE", "ROLE", "DEPARTMENT", "GO BACK"]
        })
        .then(function (answer) {
            if (answer.updateData === "EMPLOYEE") {
                empUpdate();
            }
            else if (answer.updateData === "ROLE") {
                roleUpdate();
            }
            else if (answer.updateDat === "DEPARTMENT") {
                depUpdate();
            }
            else {
                start();
            }
        })
}
function deleteFunc() {
    inquirer
        .prompt({
            name: "deleteData",
            type: "list",
            message: "Would you like to delete an [EMPLOYEE], [ROLE], [DEPARTMENT], or go back?",
            choices: ["EMPLOYEE", "ROLE", "DEPARTMENT", "GO BACK"]
        })
        .then(function (answer) {
            if (answer.deleteData === "EMPLOYEE") {
                //empAdd();
            }
            else if (answer.deleteData === "ROLE") {
                deleteRole()
            }
            
            else if (answer.deleteData === "DEPARTMENT") {
                deleteDepartment();
            }
            else {
                start();
            }
        })
}
async function addRole() {
    const departments = await DB.viewDepartments();
    const deptArray = departments.map(({ id, department_name }) => ({
        name: department_name,
        value: id
    }));
    inquirer.prompt([{
        type:"list",
        name: "departmentID",
        message:"what is the department for this role?",
        choices: deptArray
    },
    {
        type:"input",
        name:"roleName",
        message:"What is this role called?"
    },
    {
        type:"input",
        name:"salary",
        message:"What salary does this role have?"
    }
]).then( async function(res) {
    const newRole = {
        department_id: res.departmentID,
        job_title: res.roleName,
        salary: res.salary
    }
    await DB.createRole(newRole)
    console.log(res)
})
}
async function deleteDepartment(){
    const departments = await DB.viewDepartments();
    const deptArray = departments.map(({ id, department_name }) => ({
        name: department_name,
        value: id
    }));
    inquirer.prompt([{
        type: "list",
        name: "department_id",
        message: "Which department would you like to delete?",
        choices: deptArray
    }]).then(function (res){
        console.log(res)
        DB.deleteDepartment(res.department_id).then(function(res2){
            console.log("department deleted")
            start();
        })
    })
}

async function deleteRole(){
    const roles = await DB.viewRole();
    const roleArray = roles.map(({ id, job_title, salary})=>({
       name: job_title,
       value: id 
    }));
    inquirer.prompt([{
        type: "list",
        name:"job_title",
        message: "Which job would you like to delete?",
        choices: roleArray
    }]).then(function(res){
        console.log(res)
        DB.deleteRole(res.job_title).then(function(res2){
            console.log("job deleted")
            start();
        })
    })
}

start();