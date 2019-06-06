--name: get_all_users
SELECT *
FROM users

--name: insert_user
INSERT INTO users (`first`, `last`, email, pwd)
VALUES (:firstName, :lastName, :email, :pwd)

--name: get_tasks_by_uid
SELECT * FROM tasks 
WHERE user_id = :userId 


--name: get_user_by_email
SELECT * FROM users 
WHERE email = :email 


--name: insert_task
INSERT INTO tasks (task_name, task_desc, task_priority, `user_id`) 
VALUES (:taskName, :taskDesc, :taskPriority, :userId)



