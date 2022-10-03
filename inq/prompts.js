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
            }
        ]
    },
    addDept: {
        name: "deptName",
        message: "Enter department name"
    },
    addRole: [
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
            choices: [
                {
                    name: "get depts from db",
                    value: 1
                },
                {
                    name: "get depts form db 2",
                    value: 2
                }
            ]
        }
    ],
    addEmp: [
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
            choices: [
                {
                    name: "get roles from db",
                    value: 1
                }
            ]
        },
        {
            name: "empMgr",
            type: "list",
            message: "Select employee's manager",
            choices: [
                {
                    name: "get managers from db",
                    value: 1
                }
            ]
        }
    ],
    updEmp: [
        {
            name: "empID",
            type: "list",
            message: "Select employee to update",
            choices: [
                {
                    name: "get fname lname from db",
                    value: 1
                }
            ]
        },
        {
            name: "empRole",
            type: "list",
            message: "Select employee's new role",
            choices: [
                {
                    name: "get roles from db",
                    value: 1
                }
            ]
        }
    ]
}