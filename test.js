// SELECT A.id, A.first_name, A.last_name, roles.title, roles.salary, departments.name, CONCAT (B.first_name,' ', B.last_name) AS manager 
//             FROM (((employees A 
//             JOIN employees B ON A.manager_id = B.id)
//             JOIN roles ON A.role_id = roles.id)
//             JOIN departments ON roles.department_id = departments.id)