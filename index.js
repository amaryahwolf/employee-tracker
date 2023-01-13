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
            db.query(`SELECT role.title, role.id, role.salary, department.name AS department_id
            FROM  role
            JOIN department ON role.department_id = department.id;`, function(err, results){ 
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
                db.query(`INSERT INTO department(name) VALUES (?)`, res.newDepartment, function (err, results){
                    console.table(results);
                    return init();
                });
            });
            
        }// else if ('Add a role' === res.options) {
        //      // Prompt user to input title, salary, department id
        //      inquirer
        //      .prompt([
        //         {
        //             type: 'input',
        //             message: 'Enter job title:',
        //             name: 'title',
        //         },
        //         {
        //             type: 'input',
        //             message: 'Enter salary:',
        //             name: 'salary',
        //         },
        //         {
        //             type: 'list',
        //             message: 'Select a department:',
        //             choices: [
        //                 db.query(`SELECT * FROM department`, function(err, results) {
        //                     console.log(results)
        //                 })
        //             ],
        //             name: 'department'
        //         },
        //     ])     
        //     // Insert into db
        //     .then((res) => {
        //         db.query(`INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)`, res.title, res.salary, res.department, function (err, results){
        //             console.table(results);
        //             return init();
        //         });
        //     });  
        // } // else if ('Add an employee' === res.options) {
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


