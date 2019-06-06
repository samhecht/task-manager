import React, { useState, useEffect } from 'react';
import Navbar from '../general-components/Navbar';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default function ViewTasks() {
    const [tasks, setTasks] = useState([]);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem("email")){
            // they're logged in, get their previous tasks
            axios
                .get("http://localhost:9000/getTasks?email=" + sessionStorage.getItem("email"))
                .then(res => {
                    console.log(res);
                    let tempTasks = res.data.map(task => {
                        return (
                            <p>{task.task_name}</p>
                        );
                    });
                    setTasks(tempTasks);
                })
                .catch(err => {
                    console.log("Error getting tasks: ", err);
                });
        } else {
            setShouldRedirect(true);
        }
    }, []);

    // redirect if they're not logged in
    if (shouldRedirect) {
        return <Redirect to="/SignIn" />
    }

    return (
        <div>
            <Navbar />
            <p>view tasks</p>
            <p>{sessionStorage.getItem("email")}</p>
            {tasks}
        </div>
    )
}