
module.exports = {
    mainMenu: {
        name: "mainMenu",
        type: "list",
        message: "What would you like to do?",
        choices: [
            {
                name: "View all departments",
                value: "allDepts"
            },
            {
                name: "View all roles",
                value: "allRoles"
            },
            {
                name: "View all employees",
                value: "allEmps"
            },
            {
                name: "Add a department",
                value: "addDept",
            },
            {
                name: "Add a role",
                value: "addRole"
            },
            {
                name: "Add an employee",
                value: "addEmp"
            },
            {
                name: "Update an employee role",
                value: "updEmpRole"
            },
            {
                name: "Quit the application",
                value: "quit"
            }
        ]
    },
    addDept: {
        name: "deptName",
        message: "Enter department name"
    },
}

