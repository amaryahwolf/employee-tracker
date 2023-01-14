// Require necessary packages
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();

// Connect to db
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
);

//  Questions array for prompt
const options = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role'
        ],
        name: 'options',
    }
];

// Function to prompt user and query to db
function init() {
    try {
        inquirer
            .prompt(options)
            .then(async (res) => {
                if ('View all departments' === res.options) {
                    db.query(`SELECT * FROM department`, function (err, results) {
                        console.table(results);
                        return init();
                    });
                } else if ('View all roles' === res.options) {
                    db.query(`SELECT role.title, role.id, role.salary, department.name AS department_id
            FROM  role
            JOIN department ON role.department_id = department.id;`, function (err, results) {
                        console.table(results);
                        return init();
                    });
                } else if ('View all employees' === res.options) {
                    db.query(`SELECT first_name, last_name FROM employee`, function (err, results) { //needs updated query
                        console.table(results);
                        return init();
                    });
                } else if ('Add a department' === res.options) {
                    // Prompt user to input department name
                    inquirer
                        .prompt([{
                            type: 'input',
                            message: 'Enter department name:',
                            name: 'newDepartment',
                        }])
                        // Insert into db
                        .then((res) => {
                            db.query(`INSERT INTO department(name) VALUES (?)`, res.newDepartment, function (err, results) {
                                console.table(results);
                                return init();
                            });
                        });
                } else if ('Add a role' === res.options) {
                    // Prompt user to input title, salary, department id
                    const [departments] = await db.promise().query(`SELECT name, id AS value FROM department`)
                    const res = await inquirer.prompt([
                        {
                            type: 'input',
                            message: 'Enter job title:',
                            name: 'title',
                        },
                        {
                            type: 'input',
                            message: 'Enter salary:',
                            name: 'salary',
                        },
                        {
                            type: 'list',
                            message: 'Select a department:',
                            choices: departments,
                            name: 'department'
                        },
                    ])
                    const [results] = await db.promise().query(`INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)`, [res.title, res.salary, res.department])
                    console.table(results);
                    return init();
                    //} // else if ('Add an employee' === res.options) {
                    //     // Prompt user to input first name, last name, role id, manager id
                    //      inquirer
                    //      .prompt([
                    //         {
                    //             type: 'input',
                    //             message: 'Enter first name:',
                    //             name: 'firstName',
                    //         },
                    //         {
                    //             type: 'input',
                    //             message: 'Enter last name:',
                    //             name: 'lastName',
                    //         },
                    // Prompt for role id
                    // Prompt for manager
                    //     // Insert into db
                } else if ('Update an employee role' === res.options) {
                    const [employee] = await db.promise().query(`SELECT CONCAT(first_name, "_", last_name) AS name, id AS value FROM employee`)
                    const [role] = await db.promise().query(`SELECT title AS name, id AS value FROM role`)
                    const res = await inquirer.prompt([
                        {
                            type: 'list',
                            message: 'Select an employee:',
                            choices: employee,
                            name: 'employee'
                        },
                        {
                            type: 'list',
                            message: 'Select an role:',
                            choices: role,
                            name: 'role'
                        }
                    ])
                    db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [res.role, res.employee], function (err, results) {
                        console.table(results);
                        return init();
                    });
                }
            })
    } catch (err) {
        console.log(err);
    }
};

init()


