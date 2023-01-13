--  employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
-- View all employees query
SELECT employee.id, employee.first_name, employee.last_name, role.salary, role.title, AS role_id, department.name AS department_id
FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id;


-- View all roles query
SELECT role.title, role.id, role.salary, department.name AS department_id
            FROM  role
            JOIN department ON role.department_id = department.id;