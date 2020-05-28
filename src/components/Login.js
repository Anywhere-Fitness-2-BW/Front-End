import React, { useState, useEffect } from "react";
import formSchema from "../validation/formSchema";
import axios from "axios";
import * as yup from "yup";

const initialFormValues = {
  username: '',
  password: '',
}
const initialFormErrors = {
  username: '',
  password: '',
}
const initialDisabled = true;
const initialUsers = [];

export default function Login() {
  const [users, setUser] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const loginUsers = () => {
    axios
      .post("https://anytime-fitness.herokuapp.com/api/login")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onInputChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;

    yup
      .reach(formSchema, name)
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
  };

  useEffect(() => {
    loginUsers();
  }, []);

  useEffect(() => {
    formSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <div className="login container">
      <div>
        <form className="form container" onSubmit={onSubmit}>
          <div>
            <h2>Log In</h2>
            <button disabled={disabled} className="submit">
              Login
          </button>
          </div>
          <div className="errors">
            <div>{formErrors.username}</div>
            <div>{formErrors.password}</div>
          </div>
          <div className="login form inputs">
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
          </div>
        </form>
      </div>
    </div>
  );
}

