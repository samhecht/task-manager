import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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
}));

// do some input validation
// database specific validation is done server side


export default function SignUp() {
  const classes = useStyles();

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleFirst = (event) => {setFirst(event.target.value)}
  const handleLast = (event) => {setLast(event.target.value)}
  const handleEmail = (event) => {setEmail(event.target.value)}
  const handlePwd = (event) => {setPwd(event.target.value)}

  // kinda messy with all the async functions
  const validateAndSubmit = async (first, last, email, pwd) => {
    let okay = true;
    if (first.length === 0) {
      okay = false;
    }
    if (last.length === 0) {
      okay = false;
    }
    if (email.length === 0) {
      okay = false;
    }
    if (pwd.length === 0){
      okay = false;
    }
    if (okay) {
      axios
      .post("http://localhost:9000/insertUser", {
        firstName: first,
        lastName: last,
        email: email,
        password: pwd
      })
      .then(async res => {
        console.log("succesfully created new user")
        await sessionStorage.setItem("email", email);
        setShouldRedirect(true);
      })
      .catch(err => {
        okay = false;
        sessionStorage.clear();
        alert("badly formatted input");
      });
    } else {
      alert("badly formatted input");
    }

    
  }


  const submitUser = (event) => {
    validateAndSubmit(first, last, email, pwd);
    event.preventDefault();
  }

  if (shouldRedirect) {
    return <Redirect to="/ViewTasks" />;
  }

  return (
    <div>
    <Navbar/>
    <Container component="main" maxWidth="xs">

      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={handleFirst}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handleLast}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handlePwd}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitUser}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/SignIn" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    </div>
  );
}

