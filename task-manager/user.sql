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

--name: remove_task_by_id
DELETE FROM tasks
WHERE task_id = :taskId 

--name: update_task
UPDATE tasks 
SET task_priority = :taskPriority, task_desc = :taskDesc
WHERE task_id = :taskId 



