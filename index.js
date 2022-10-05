//npm packages
const inquirer = require('inquirer');
const mysql = require('mysql2');
const mysqlPromises = require('mysql2/promise');
const table = require('console.table');

const connection = require(`./db/conn.js`);
const prompts = require(`./inq/prompts`);

// Connect to database
const db = mysql.createConnection(connection);
//for dynamic prompts
let prompts2

const start = () => {
    //    getRoles();
    inquirer
        .prompt(prompts.mainMenu)
        .then(handleMenu)
}

const handleMenu = (menuResponse) => {
    if (menuResponse.mainMenu == "allDepts") {
        db.query(`SELECT * FROM departments`, (err, results) => {
            console.log(table.getTable(results));
            start();
        })
    }
    else if (menuResponse.mainMenu == "allRoles") {
        db.query(`SELECT roles.id, title, salary, departments.name AS department FROM roles JOIN departments ON roles.department_id = departments.id`, (err, results) => {
            console.log(table.getTable(results));
            start();
        })
    }
    else if (menuResponse.mainMenu == "allEmps") {
        db.query(`SELECT A.id, A.first_name, A.last_name, roles.title, roles.salary, departments.name, CONCAT (B.first_name,' ', B.last_name) AS manager 
            FROM (((employees A 
            LEFT JOIN employees B ON A.manager_id = B.id)
            JOIN roles ON A.role_id = roles.id)
            JOIN departments ON roles.department_id = departments.id)`, (err, results) => {
            console.log(table.getTable(results));
            start();
        })
    }
    else if (menuResponse.mainMenu == "addDept") {
        inquirer.prompt(prompts.addDept).then((resp => {
            db.query(`INSERT INTO departments(name) VALUES ("${resp.deptName}")`, (err, result) => {
                if (err) console.log(err);
                else {
                    console.log(`${resp.deptName} added.`);
                } start()
            })
        }))
    }
    else if (menuResponse.mainMenu == "addRole") {
        getAddRolePrompts().then(() => {
            inquirer.prompt(prompts2).then((resp => {
                db.query(`INSERT INTO roles(title, salary, department_id) VALUES ("${resp.roleTitle}", "${resp.roleSalary}", ${resp.roleDept})`, (err, result) => {
                    if (err) console.log(err);
                    else {
                        console.log(`${resp.roleTitle} added.`)
                        start();
                    }
                })
            }))
        })
    }
    else if (menuResponse.mainMenu == "addEmp") {
        getAddEmpPrompts().then(() => {
            inquirer.prompt(prompts2).then((resp => {
                db.query(`INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ("${resp.empFName}", "${resp.empLName}", ${resp.empRole}, ${resp.empMgr})`, (err, result) => {
                    if (err) console.log(err);
                    else {
                        console.log(`${resp.empFName} ${resp.empLName} added.`)
                        start();
                    }
                })
            }))

        })
    }
    else if (menuResponse.mainMenu == "updEmpRole") {
        getUpdEmpPrompts().then(() => {
            inquirer.prompt(prompts2).then((resp => {
                console.log(`UPDATE employees SET role_id = ${resp.empRole} WHERE id=${resp.empID}`);
                db.query(`UPDATE employees SET role_id = ${resp.empRole} WHERE id=${resp.empID}`, (err, result) => {
                    if (err) console.log(err);
                    else {
                        console.log(`Updated.`)
                        start();
                    }
                })
            }))
        })
    }
    else {
        console.log(`Goodbye.`)
        process.exit();
    }
}
const getAddEmpPrompts = async () => {
    const db2 = await mysqlPromises.createConnection(connection);
    const roles = await db2.execute(`SELECT id, title FROM roles`);
    let roleArr = [];
    roles[0].forEach((result) => {
        let optionObj = {
            name: result.title,
            value: result.id
        }
        roleArr.push(optionObj)
    }
    )
    const mgrs = await db2.execute(`SELECT id, CONCAT (first_name, ' ', last_name) as mgrname FROM employees WHERE manager_id IS NULL`);
    let mgrArr = [];
    mgrs[0].forEach((mgr) => {
        let optionObj = {
            name: mgr.mgrname,
            value: mgr.id
        }
        mgrArr.push(optionObj)
    }
    )
    setAddEmpPrompts(roleArr, mgrArr)
}

const setAddEmpPrompts = (roleOpts, mgrOpts) => {
    prompts2 = [
        {
            name: "empFName",
            message: "Enter employee's first name"
        },
        {
            name: "empLName",
            message: "Enter employee's last name"
        },
        {
            name: "empRole",
            type: "list",
            message: "Select employee's role",
            choices: roleOpts
        },
        {
            name: "empMgr",
            type: "list",
            message: "Select employee's manager",
            choices: mgrOpts
        }
    ]
}

const getUpdEmpPrompts = async () => {
    const db2 = await mysqlPromises.createConnection(connection);
    const names = await db2.execute(`SELECT id, CONCAT (first_name, ' ', last_name) as name FROM employees`);
    let nameArr = [];
    names[0].forEach((name) => {
        let optionObj = {
            name: name.name,
            value: name.id
        }
        nameArr.push(optionObj)
    }
    )
    const roles = await db2.execute(`SELECT id, title FROM roles`);
    let rolesArr = [];
    roles[0].forEach((role) => {
        let optionObj = {
            name: role.title,
            value: role.id
        }
        rolesArr.push(optionObj)
    }
    )
    setUpdEmpPrompts(nameArr, rolesArr)
}

const setUpdEmpPrompts = (empNames, empRoles) => {
    prompts2 = [
        {
            name: "empID",
            type: "list",
            message: "Select employee to update",
            choices: empNames
        },
        {
            name: "empRole",
            type: "list",
            message: "Select employee's new role",
            choices: empRoles
        }
    ]
}
const getAddRolePrompts = async () => {
    const db2 = await mysqlPromises.createConnection(connection);
    const depts = await db2.execute(`SELECT id, name FROM departments`);
    let deptArr = [];
    depts[0].forEach((dept) => {
        let optionObj = {
            name: dept.name,
            value: dept.id
        }
        deptArr.push(optionObj)
    }
    )
    setAddRolePrompts(deptArr)
}

const setAddRolePrompts = (roleDepts) => {
    prompts2 = [
        {
            name: "roleTitle",
            message: "Enter the role title"
        },
        {
            name: "roleSalary",
            message: "Enter the role salary"
        },
        {
            name: "roleDept",
            type: "list",
            message: "Select the role department",
            choices: roleDepts
        }
    ]
}

start();
