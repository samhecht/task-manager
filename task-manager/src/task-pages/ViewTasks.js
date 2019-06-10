import React, { useState, useEffect } from 'react';
import Navbar from '../general-components/Navbar';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Card } from 'antd';
import { Box, Typography, Button} from '@material-ui/core';
import { Radio } from 'antd';
import TextField from '@material-ui/core/TextField';
import 'antd/dist/antd.css';


export default function ViewTasks() {
    const [tasks, setTasks] = useState([]);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [shouldReload, setShouldReload] = useState(false);
    const [currEdit, setCurrEdit] = useState(null);
    const [editPriority, setEditPriority] = useState(1);
    const [editDesc, setEditDesc] = useState("");

    const deleteTask = (taskId) => {
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
        setShouldReload(true);
        
    }
    const editTask = (taskId) => {
        setCurrEdit(taskId);
        setShouldReload(true);
    }
    const onPriorityEdit = (event) => {
        setEditPriority(event.target.value);
        setShouldReload(true);
    }
    const onEditTask = (event) => {
        const currPrio = editPriority;
        const currDesc = editDesc;
        const taskId = currEdit;

        axios
            .post("http://localhost:9000/editTask", {
                description: currDesc,
                priority: currPrio,
                taskId: taskId,
            })
            .then(res => {
                console.log(res);
                setEditPriority(1);
                setEditDesc("");
                setCurrEdit(null);
                setShouldReload(true);
            })
            .catch(() => {
                alert("failed to submit task, try again");
                setEditPriority(1);
                setEditDesc("");
                setCurrEdit(null);
            });
        event.preventDefault();
    }

    const onDescEdit = (event) => {
        setEditDesc(event.target.value);
        setShouldReload(true);
    }

    useEffect(() => {
        if (sessionStorage.getItem("email")){
            // they're logged in, get their previous tasks
            axios
                .get("http://localhost:9000/getTasks?email=" + sessionStorage.getItem("email"))
                .then(res => {
                    console.log(res);
                    let tempTasks = res.data.map(task => {
                        if (task.task_id === currEdit) {
                            
                            return ({
                                taskPriority: task.task_priority,
                                taskHTML: (<div key={task.task_id}>
                                    <Card
                                        style={{ marginTop: 16, margin: "5% 25%", }}
                                        type="inner"
                                        title={task.task_name}
                                    >
                                    <Box display='flex' flexDirection='column'>
                                        <Box display='flex' flexDirection='row' justifyContent='flex-start'>
                                        <Typography component="h6" variant="h6">
                                            Priority: 
                                        </Typography>
                                        <Radio.Group onChange={onPriorityEdit} value={editPriority}>
                                            <Radio value={1}>1</Radio>
                                            <Radio value={2}>2</Radio>
                                            <Radio value={3}>3</Radio>
                                            <Radio value={4}>4</Radio>
                                        </Radio.Group>
                                        </Box>
                                    </Box>
                                    <TextField
                                        value={editDesc}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Task description"
                                        type="Task description"
                                        id="password"
                                        multiline
                                        rows="3"
                                        rowsMax="10"
                                        onChange={onDescEdit}
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={onEditTask}
                                        style={{
                                            backgroundColor: "#E97A3A",
                                        }}
                                    >
                                        Submit Edit
                                    </Button>
                                    </Card>
                                </div>),
                            });
                        }
                        return ({
                            taskPriority: task.task_priority,
                            taskHTML: (
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
                                    <Typography component="h6" variant="h6" display='flex'> 
                                    {task.task_desc}
                                    </Typography>
                                    </Box>
                                    <Box display='flex' flexDirection='row' justifyContent='flex-end' marginLeft="10%">
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={(event) => {editTask(task.task_id); event.preventDefault();}}
                                        style={{
                                            width: '20%',
                                            height: '40px',
                                            backgroundColor: '#E97A3A',
                                            marginRight: '2%',
                                        }}
                                    >
                                        Edit
                                    </Button>
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
                            ),
                        }
                        
                        );
                    });
                    // sort by priority
                    tempTasks.sort((a, b) => b.taskPriority - a.taskPriority);
                    const taskDisplay = tempTasks.map(task => task.taskHTML);
                    setTasks(taskDisplay);
                    setShouldReload(false);
                })
                .catch(err => {
                    console.log("Error getting tasks: ", err);
                });
        } else {
            setShouldRedirect(true);
        }
    }, [shouldReload]);

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