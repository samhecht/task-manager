import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from './authentication/SignUp';
import SignIn from './authentication/SignIn';
import CreateTask from './task-pages/CreateTask';
import ViewTasks from './task-pages/ViewTasks';


export default function App() {

  return (
    <div className="App">

      <Router>
        <Route exact path="/SignUp" component={SignUp} />
        <Route exact path="/SignIn" component={SignIn} />
        <Route exact path="/CreateTask" component={CreateTask} />
        <Route exact path="/ViewTasks" component={ViewTasks} />
      </Router>
   
    </div>
  );
}

