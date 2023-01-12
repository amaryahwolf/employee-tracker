INSERT INTO department (name)
VALUES ("Engineering"),
        ("Communications"),
        ("Legal"),
        ("Accounting");

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 1),
        ("Lead Engineer", 180000, 1),
        ("Communications Lead", 90000, 2),
        ("Communications Assistant", 50000, 2),
        ("Lawyer", 160000, 3),
        ("Paralegal", 80000, 3),
        ("Bookkeeper", 70000, 4),
        ("Controller", 140000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Gerard", "Wells", 1, 2),
        ("Martha", "Cheung", 2, NULL),
        ("David", "Abernath", 3, NULL),
        ("Barbara", "Lawrence", 4, 3),
        ("Edwina", "Jones", 5, NULL),
        ("Ron", "Nieman", 6, 5),
        ("Charlotte", "Ozel", 7, 8),
        ("Henry", "Zimby", 8, NULL);
