const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table)");
const { start } = require("repl");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8080,
    user: "root",
    password: 'B1gB@dB3llig3r@nt',
    database: "employees_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

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
            else if (answer.empTrack === "VIEW"){
                viewFunc();
            }
            else if (answer.empTrack === "UPDATE"){
                updateFunc();
            }
            else{
                connection.end();
            }
        });
}
function addFunc(){
    inquirer
    .prompt({
        name:"addData",
        type:"list",
        message:"Would you like to add an [EMPLOYEE], [ROLE], [DEPARTMENT], or go back?",
        choices: ["EMPLOYEE", "ROLE", "DEPARTMENT", "GO BACK"]
    })
    .then(function (answer){
        if (answer.addData === "EMPLOYEE"){
            empAdd();
        }
        else if(answer.addData === "ROLE"){
            roleAdd();
        }
        else if (answer.addDat === "DEPARTMENT"){
            depAdd();
        }
        else{
            start();
        }
    })
}
function viewFunc(){
    inquirer
    .prompt({
        name:"viewData",
        type:"list",
        message:"Would you like to view an [EMPLOYEE], [ROLE], [DEPARTMENT], or go back?",
        choices: ["EMPLOYEE", "ROLE", "DEPARTMENT", "GO BACK"]
    })
    .then(function (answer){
        if (answer.viewData === "EMPLOYEE"){
            empView();
        }
        else if(answer.viewData === "ROLE"){
            roleView();
        }
        else if (answer.viewData === "DEPARTMENT"){
            depView();
        }
        else{
            start();
        }
    })
}
function updateFunc(){
    inquirer
    .prompt({
        name:"updateData",
        type:"list",
        message:"Would you like to update an [EMPLOYEE], [ROLE], [DEPARTMENT], or go back?",
        choices: ["EMPLOYEE", "ROLE", "DEPARTMENT", "GO BACK"]
    })
    .then(function (answer){
        if (answer.updateData === "EMPLOYEE"){
            empUpdate();
        }
        else if(answer.updateData === "ROLE"){
            roleUpdate();
        }
        else if (answer.updateDat === "DEPARTMENT"){
            depUpdate();
        }
        else{
            start();
        }
    })
}