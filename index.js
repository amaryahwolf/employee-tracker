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
    inquirer
    .prompt(options)
    .then((res) => {
        if ('View all departments' === res.options) {
            db.query(`SELECT * FROM department`, function(err, results) {
                console.table(results);
                return init();
            });
        } else if ('View all roles' === res.options) {
            db.query(`SELECT title, id, department_id, salary FROM role`, function(err, results){
            console.table(results);
            return init();
            });
        }
            else if ('View all employees' === res.options) {
            db.query(`SELECT first_name, last_name FROM employee`, function (err, results) {
                console.table(results);
                return init();
            });
         } //else if ('Add a department' === res.options) {
        //     // Prompt user to input department name
        //     // Insert into db
        // } else if ('Add a role' === res.options) {
        //     // Prompt user to input title, salary, department id
        //     // Insert into db
        // } else if ('Add an employee' === res.options) {
        //     // Prompt user to input first name, last name, role id, manager id
        //     // Insert into db
        // } else ('Update an employee role' === res.otpions) {
        //     // Prompt user to select employee
        //     // Prompt user to select new role
        //     // Update db
        // }
    })
};

init()


