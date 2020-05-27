import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import './App.css';

import NavBar from './components/Navbar'
import Registration from './components/Registration'
import Login from './components/Login'
// import Login from './components/Test'
// import SignUp from './components/TestR'



function App() {
  return (
   <Router>
    <div>
      <h1>Anywhere Fitness</h1>
        <NavBar/>
        <Link to='/'>Sign Up</Link>
        <Link to='/login'>Login</Link>
        <Switch>
            <Route exact path='/'>
                <Registration />
            </Route>
            <Route path='/login'>
                <Login />
            </Route>
        </Switch>
    </div>
    </Router>
  );
}

export default App;
