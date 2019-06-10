import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Radio } from 'antd';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Navbar from '../general-components/Navbar';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function CreateTask() {
    const classes = useStyles();

    const [priority, setPriority] = useState(1);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const onPriorityChange = (event) => {
        setPriority(event.target.value);
    }

    const onNameChange = (event) => {
        setName(event.target.value);
    }

    const onDescChange = (event) => {
        setDesc(event.target.value);
    }

    const onSubmitTask = (event) => {
        const currPrio = priority;
        const currName = name;
        const currDesc = desc;

        axios
            .post("http://localhost:9000/insertTask", {
                name: currName,
                description: currDesc,
                priority: currPrio,
                email: sessionStorage.getItem("email"),
            })
            .then(res => {
                console.log(res);
                setName("");
                setDesc("");
                setPriority(1);
                console.log("submitted task");
            })
            .catch(() => {
                alert("failed to submit task, try again");
                setName("");
                setDesc("");
                setPriority(1);
            });
        event.preventDefault();
    }

    useEffect(() => {
        if (!sessionStorage.getItem("email")) {
            setShouldRedirect(true);
        }
            
    }, [])

    if (shouldRedirect) {
        return <Redirect to="/SignIn" />;
    }
    

    return (
        <div>
        <Navbar />
            
        <Container component="main" maxWidth="sm">

            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h4">
                Create a Task
                </Typography>
                <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <TextField
                            value={name}
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Task name"
                            name="email"
                            autoComplete="email"
                            onChange={onNameChange}
                        />
                    </Grid>
                    <Grid item xs={4} style={{justifyContent: 'flex-end'}}>
                        <Typography component="h6" variant="h6">
                            Priority
                        </Typography>
                        <Radio.Group onChange={onPriorityChange} value={priority}>
                            <Radio value={1}>1</Radio>
                            <Radio value={2}>2</Radio>
                            <Radio value={3}>3</Radio>
                            <Radio value={4}>4</Radio>
                        </Radio.Group>
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        value={desc}
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
                        onChange={onDescChange}
                    />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={onSubmitTask}
                >
                    Submit Task
                </Button>
                </form>
        </div>
        </Container>

        </div>
    )
}