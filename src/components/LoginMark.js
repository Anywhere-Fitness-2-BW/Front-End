import React, { useState, useEffect, useContext } from "react";
import loginSchema from "../validation/loginSchema";
// import axios from "axios";
import * as yup from "yup";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import { NavContext } from "../contexts/NavContext";

const initialFormValues = {
  username: "",
  password: "",
};
const initialFormErrors = {
  username: "",
  password: "",
};
const initialDisabled = true;
const initialUsers = [];

export default function Login() {
  const { isClient, setIsClient, isLoggedIn, setIsLoggedIn } = useContext(
    NavContext
  );
  const [users, setUser] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);
  const { push } = useHistory();

  const onInputChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;

    yup
      .reach(loginSchema, name)
      .validate(value)
      .then((valid) => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    axiosWithAuth()
      .post(`/api/auth/login`, formValues)
      .then((response) => {
        console.log(response.data, "resdata");
        localStorage.setItem("token", response.data.token);
        setIsLoggedIn(true);
        if (response.data.role === "student") {
          setIsClient(true);
          push("/client/class_search");
        }
        if (response.data.role === "instructor") {
          setIsClient(false);
          push("/instructorlist");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loginSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <div className="login container">
      <form className="form container" onSubmit={onSubmit}>
        <div id="login-title">
          <h2>Log In</h2>
        </div>
        <div className="login form">
          <h4>Login Information</h4>
          <label>
            Username:
            <input
              value={formValues.username}
              onChange={onInputChange}
              name="username"
              type="text"
            />
          </label>
          <label>
            Password:
            <input
              value={formValues.password}
              onChange={onInputChange}
              name="password"
              type="text"
            />
          </label>
          <div id="login-btn">
            <button className="submit">Login</button>
          </div>
          <div className="errors">
            <div>{formErrors.username}</div>
            <div>{formErrors.password}</div>
          </div>
        </div>
      </form>
    </div>
  );
}
