import React, { useState, useEffect } from 'react';
import Navbar from '../general-components/Navbar';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Card } from 'antd';
import { Box, Typography, Button} from '@material-ui/core';
import 'antd/dist/antd.css';

export default function ViewTasks() {
    const [tasks, setTasks] = useState([]);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [shouldReload, setShouldReload] = useState(false);

    const deleteTask = (taskId) => {
        console.log(taskId);
        axios
            .post("http://localhost:9000/removeTask",{
                taskId: taskId,
            })
            .then(() => {
                console.log("task removed")
            })
            .catch(() => {
                alert("couldn't remove task")
            });
        
    }

    useEffect(() => {
        if (sessionStorage.getItem("email")){
            // they're logged in, get their previous tasks
            axios
                .get("http://localhost:9000/getTasks?email=" + sessionStorage.getItem("email"))
                .then(res => {
                    console.log(res);
                    let tempTasks = res.data.map(task => {
                        return (
                        <div key={task.task_id}>
                            <Card
                                style={{ marginTop: 16, margin: "5% 25%", }}
                                type="inner"
                                title={task.task_name}
                            >
                            <Box display='flex' flexDirection='column'>
                                <Box display='flex' flexDirection='row' justifyContent='flex-start'>
                                <Typography component="h5" variant="h5"> 
                                Priority: {task.task_priority}
                                </Typography>
                                </Box>
                                <Box display='flex' flexDirection='row' justifyContent='flex-start'>
                                <Typography component="h5" variant="h5"> 
                                Description: 
                                </Typography>
                                </Box>
                                <Box display='flex' flexDirection='row' justifyContent='flex-start' marginLeft="10%">
                                <Typography component="h6" variant="h6"> 
                                {task.task_desc}
                                </Typography>
                                </Box>
                                <Box display='flex' flexDirection='row' justifyContent='flex-end' marginLeft="10%">
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={(event) => {deleteTask(task.task_id); event.preventDefault();}}
                                    style={{
                                        width: '20%',
                                        height: '40px',
                                        backgroundColor: '#ff0000',
                                    }}
                                >
                                    Remove
                                </Button>
                                </Box>
                                
                            </Box>
                            </Card>

                        </div>
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
            <h1 style={{marginTop: '6%'}}>View Tasks</h1>
            {tasks}
        </div>
    )
}