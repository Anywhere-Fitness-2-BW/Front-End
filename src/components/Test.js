import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from "material-ui/RaisedButton";
import axios from 'axios'


export const Login = () => {
    const match = useRouteMatch('/login')
    const [ creds, setCreds ] = useState({});

    const handleChange = (input) => (e) => {
        setCreds({ ...creds, [input]: e.target.value});
    };

    const onLogin = (e) => {
        e.preventDefualt();
        // .post()
        // .then()
    }
    return (
        <MuiThemeProvider>
      <React.Fragment>
        <AppBar className="login" title="Enter Login Information" />
        <TextField
          hintText="Enter Username"
          floatingLabelText="Username"
          onChange={handleChange}
        />
        <br />
        <TextField
          hintText="Enter Password"
          floatingLabelText="Password"
          onChange={handleChange}
        />
        <br />
        <RaisedButton
          label="Continue"
          primary={true}
          onClick={onLogin}
        />
      </React.Fragment>
    </MuiThemeProvider>
  );
};
