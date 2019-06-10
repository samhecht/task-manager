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


export default function SignIn() {
    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const handleEmail = (event) => {setEmail(event.target.value)}
    const handlePwd = (event) => {setPwd(event.target.value)}

    const submitLogin = (event) => {
        const currEmail = email;
        const currPass = pwd;
        axios
            .post("http://localhost:9000/login", {
                email: currEmail,
                password: currPass,
            })
            .then(() => {
                sessionStorage.setItem("email", currEmail);
                console.log("sucessfully logged in")
                setShouldRedirect(true);
            })
            .catch(() => {
                sessionStorage.clear();
                console.log("failed to login")
                alert("incorrect email or password");
            })
        event.preventDefault();
    }

    if (shouldRedirect) {
        return <Redirect to="ViewTasks" />;
    }

    return (
        <div>
    <Navbar/>
    <Container component="main" maxWidth="xs">

      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar} style={{backgroundColor: "#E97A3A"}}>
          <LockOutlinedIcon style={{backgroundColor: "#E97A3A"}} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
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
            style={{
              backgroundColor:"#62C2CC"
            }}
            
            className={classes.submit}
            onClick={submitLogin}
          >
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/SignUp" variant="body2">
                Dont have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    </div>
    );
}