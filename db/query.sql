SELECT employees.id, first_name, last_name, roles.title, roles.salary, departments.name 
FROM ((employees 
JOIN roles ON employees.role_id = roles.id)
JOIN departments ON roles.department_id = departments.id);