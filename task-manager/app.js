const express = require('express');
const app = express();
const port = 9000;
const mysql = require('mysql');
const puresql = require('puresql');
const cors = require('cors');
require('dotenv').config();


const dbPassword = process.env.REACT_APP_DB_PASSWORD;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

const connection = mysql.createConnection({
	host : 'localhost',
	port : 3306,
	user : 'root',
	password : dbPassword,
	database : 'task_manager'
});

const adapter = puresql.adapters.mysql(connection);
const queries = puresql.loadQueries('user.sql');

app.get('/', (req, res) => {
	res.send('hello world');
});

app.get('/allUsers', (req, res) => {
	async function getAllUsers() {
		try {
			const users = await queries.get_all_users({}, adapter);
			res.send(users);
		} catch {
			res.send('couldn\'t get users');
		}
	}
	getAllUsers();
});

app.get('/getTasks', (req, res) => {
	let email = req.query.email;
	async function getTasksByEmail() {
		try {
			const currUser = await queries.get_user_by_email({email: email}, adapter);
			let uid = currUser[0].user_id;
			const tasks = await queries.get_tasks_by_uid({userId: uid}, adapter);
			res.send(tasks);
		} catch {
			return null;
		}
	}
	getTasksByEmail();
});

app.post('/insertUser', (req, res) => {
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;
	const pwd = req.body.password;
	async function insertUser() {
		try {
			// only allow one of each email
			const alreadyExists = await queries.get_user_by_email({email: email}, adapter);
			if (alreadyExists.length > 0) {
				res.status("404").send({
					message: "couldn't create user",
				});
			} else {
				await queries.insert_user({
					firstName: firstName,
					lastName: lastName,
					email: email,
					pwd: pwd,
				}, adapter);
				console.log("shouldve inserted user");
				res.status("200").send({
					message: "created new user",
				});
			}	
		} catch (e) {
			console.log("couldn't add new user", e);
			res.status("404").send({
				message: "couldn't create user",
			});
		}
	}
	insertUser();
});

app.post('/login', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	async function loginUser() {
		const user = await queries.get_user_by_email({email: email}, adapter);
		if (user.length === 0 || user.length > 1) {
			res.status("404").send({
				message: "wrong username or password",
			});
		} else {
			const pwd = user[0].pwd;
			if (pwd === password) {
				res.status("200").send({
					message: "sucessfully logged in",
				});
			} else {
				res.status("404").send({
					message: "wrong username or password",
				});
			}
		}
	}
	loginUser();
});

app.post('/insertTask', (req, res) => {
	const taskName = req.body.name;
	const taskDesc = req.body.description;
	const taskPriority = req.body.priority;
	const email = req.body.email;

	async function insertTask() {
		try {
			const currUser = await queries.get_user_by_email({email: email}, adapter);
			if (currUser === null) {
				res.status("404").send({
					message: "couldn't find user"
				});
			} else {
				const userId = currUser[0].user_id;
				await queries.insert_task({
					taskName: taskName,
					taskDesc: taskDesc,
					taskPriority: taskPriority,
					userId: userId,
				}, adapter);
				res.status("200").send({
					message: "task inserted",
				});
			}
		} catch {
			res.status("404").send({
				message: "couldn't find user"
			});
		}
	}
	insertTask();
});

app.post('/removeTask', (req, res) => {
	const taskId = req.body.taskId;
	async function removeTask() {
		try {
			await queries.remove_task_by_id({taskId: taskId}, adapter);
			res.status("200").send({
				message: "removed task",
			});
		} catch {
			res.status("404").send({
				message: "failed to remove task",
			});
		}
	}
	removeTask();
})
app.listen(port, () => {
	console.log("listening on port 9000");
});
