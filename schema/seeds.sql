INSERT INTO department(department_name) VALUES ("Accounting"), ("Sales"), ("Marketing");
INSERT INTO title(department_id, job_title, salary) VALUES(1, "Accountant", 60000), (2, "Sales Manager", 75000), (2,"Sales Technician", 60000);
INSERT INTO employee(title_id, first_name, last_name, manager_id) VALUES (2, "Joe", "McRealPerson"), (3, "Fred", "Willard", 2), (1, "Celia", "Liu"); 