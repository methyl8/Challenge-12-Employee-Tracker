//npm packages
const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const table = require('console.table');

const prompts = require('./inq/prompts')

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password
        password: 'root',
        database: 'employee_tracker_db'
    },
    console.log(`Connected to the employee_tracker_db database.`)
);

const start = () => {
    inquirer
        .prompt(prompts.mainMenu)
        .then(handleMenu)
}

const handleMenu = (menuResponse) => {
    if(menuResponse.mainMenu == "allDepts") {
        db.query(`SELECT * FROM departments`, (err, results) => {
            console.log(table.getTable(results));
            start();
        })
    }
    else if(menuResponse.mainMenu == "allRoles") {
        db.query(`SELECT roles.id, title, salary, departments.name AS department FROM roles JOIN departments ON roles.department_id = departments.id`, (err, results) => {
            console.log(table.getTable(results));
            start();
        })
    }
    else if(menuResponse.mainMenu == "allEmps") {
        db.query(`SELECT employees.id, first_name, last_name, roles.title, roles.salary, departments.name 
            FROM ((employees 
            JOIN roles ON employees.role_id = roles.id)
            JOIN departments ON roles.department_id = departments.id)`, (err, results) => {
            console.log(table.getTable(results));
            start();
        })
    }
    else if(menuResponse.mainMenu == "addDept") {
        inquirer.prompt(prompts.addDept).then((resp => {
            db.query(`INSERT INTO departments(name) VALUES ("${resp.deptName}")`, (err,result) => {
                if(err) console.log(err);
                else start()
            })
        }))
    }
    else if(menuResponse.mainMenu == "addRole") {
        inquirer.prompt(prompts.addRole).then((resp => {
            db.query(`INSERT INTO roles(title, salary, department_id) VALUES ("${resp.roleTitle}", "${resp.roleSalary}", ${resp.roleDept})`, (err,result) => {
                if(err) console.log(err);
                else start()
            })
        }))
    }
    else if(menuResponse.mainMenu == "addEmp") {
        inquirer.prompt(prompts.addEmp).then((resp => {
            db.query(`INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ("${resp.empFName}", "${resp.empLName}", ${resp.empRole}, ${resp,empMgr}),`, (err,result) => {
                if(err) console.log(err);
                else start()
            })
        }))
    }
    else if(menuResponse.mainMenu == "updEmpRole") {
        inquirer.prompt(prompts.updEmp).then((resp => {
            db.query(`UPDATE employees SET role_id = ${resp.empRole} WHERE id=${resp.empID}`, (err,result) => {
                if(err) console.log(err);
                else start()
            })
        }))
    }
}


app.listen(PORT, start);
