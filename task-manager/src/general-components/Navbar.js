import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core';



const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
}));



function Navbar(props){
    const classes = useStyles();

    const navBarStyle = {
      backgroundColor: '#E97A3A',
      padding: "2% 1%",
    }

    const linkStyle = {
      color: 'white',
      textDecoration: 'none',
    }

    let loginText = props.loggedIn ? "Logout" : "Login";

    return (
    <div className={classes.root}>
      <Box
        display='flex'
        flex-direction='row'
        justifyContent='space-between'
        style={navBarStyle}
      >
        <Box
          marginLeft="5%"
        >
          <Link style={linkStyle} to="/ViewTasks">
            <Typography variant="h4" to="/" style={{color: "white"}}>
              TaskManager
            </Typography>
          </Link>
        </Box>
        
        <Box
          display='flex'
          flex-direction='row'
          justifyContent='space-evenly'
          color="inherit"
          width="45%"
        >
          <Button color="inherit"><Link style={linkStyle} to="/ViewTasks">Task Log</Link></Button>
          <Button color="inherit"><Link style={linkStyle} to="/CreateTask">Create Task</Link></Button>
          <Button 
            color="inherit" 
            onClick={() => {
              sessionStorage.clear();
            }}
            
          >
            <Link style={linkStyle} to="/SignIn">{loginText}</Link>
          </Button>
        </Box>
      </Box>
    </div>
    );

}
export default Navbar;