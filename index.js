const mysql = require("mysql");
const inquirer = require("inquirer");

const DB = require("./Database/DB")

function start() {
    inquirer
        .prompt({
            name: "empTrack",
            type: "list",
            message: "Would you like to [ADD] an employee, role or department? [VIEW] Employees, role or department or [UPDATE] an employee, role, or department?",
            choices: ["ADD", "VIEW", "UPDATE", "GOODBYE"]

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
            else {
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
                roleAdd();
            }
            else if (answer.addData === "DEPARTMENT") {
                inquirer.prompt([{
                    type: "input",
                    name: "departmentName",
                    message: "What is this department called?"
                }]).then(function (answer) {
                    DB.createDepartment(answer.departmentName)
                        .then(console.log("Created New Department:" + answer.departmentName));
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
                empView();
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


start();