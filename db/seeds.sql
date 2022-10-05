INSERT INTO departments(name) VALUES
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal");

INSERT INTO roles(title, salary, department_id) VALUES
    ("Sales Lead", 100000, 1),
    ("Salesperson", 80000, 1),
    ("Lead Engineer", 150000, 2),
    ("Software Engineer", 120000, 2),
    ("Account Manager", 160000, 3),
    ("Accountant", 125000, 3),
    ("Legal Team Lead", 250000, 4),
    ("Lawyer", 190000, 4);

INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES
    ("John", "Doe", 1, NULL),
    ("Steve", "Salesman", 2, 1),
    ("Jane", "Dont", 3, NULL),
    ("Eric", "Engineman", 4, 3),
    ("Jerry", "Would", 5, NULL),
    ("Freddy", "Financier", 6, 5),
    ("Jenny", "Mite", 7, NULL),
    ("Larry", "Lawman", 8, 7);
