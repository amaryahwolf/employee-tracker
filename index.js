// Require necessary packages
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'potatoPie333!',
      database: 'employee_db'
    },
  );

const options = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role'
        ],
        name: 'options',
    }
];

function init() {
    inquirer
    .prompt(options)
    .then((res) => {
        if ('View all departments' === res.options) {
            db.query(`SELECT * FROM department`, function(err, results) {
                console.table(results)
            });
        } 
    })
};

init()

// Use inquirer to create prompt, .then, .catch
// Add mysql and console.table syntax to .then(answers) 


