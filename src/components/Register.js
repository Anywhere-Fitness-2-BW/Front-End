import React, { useState, useEffect } from "react";
import formSchema from "../validation/formSchema";
import axios from "axios";
import * as yup from "yup";

const initialFormValues = {
  name: "",
  email: "",
  username: "",
  password: "",
  role: "",
};
const initialFormErrors = {
  name: "",
  email: "",
  username: "",
  password: "",
  role: "",
};
const initialDisabled = true;
const initialUsers = [];

export default function Registration() {
  const [users, setUser] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);


  // const postNewUser = (newUser) => {
  //   axios
  //     .post("https://anytime-fitness.herokuapp.com/api/auth/register", newUser)
  //     .then((res) => {
  //       setUser([res.data, ...users]);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   setFormValues({
  //     name: "",
  //     email: "",
  //     username: "",
  //     password: "",
  //     role: "",
  //   });
  // .finally(() => {
  //   setFormValues(initialFormValues);
  // });
  // };

  const onInputChange = (evt) => {
    // const name = evt.target.name;
    // const value = evt.target.value;
    setFormValues({
      ...formValues,
      [evt.target.name]: evt.target.value,
    });
  };
  //   yup
  //     .reach(formSchema, name)
  //     .validate(value)
  //     .then((valid) => {
  //       setFormErrors({
  //         ...formErrors,
  //         [name]: "",
  //       });
  //     })
  //     .catch((err) => {
  //       setFormErrors({
  //         ...formErrors,
  //         [name]: err.errors[0],
  //       });
  //     });
  //   setFormValues({
  //     ...formValues,
  //     [name]: value,
  //   });
  // };

  // const onSubmit = (evt) => {
  //   evt.preventDefault();

  //   const newUser = {
  //     // name: formValues.name.trim(),
  //     // email: formValues.email.trim(),
  //     // username: formValues.username.trim(),
  //     // password: formValues.password.trim(),
  //     // role: formValues.role.trim(),

  //     name: formValues.name,
  //     email: formValues.email,
  //     username: formValues.username,
  //     password: formValues.password,
  //     role: formValues.role,
  //   };
  //   postNewUser(newUser);
  // };

  // useEffect(() => {
  //   // getUsers();
  // }, []);

  // useEffect(() => {
  //   formSchema.isValid(formValues).then((valid) => {
  //     setDisabled(!valid);
  //   });
  // }, [formValues]);
  const onSubmit = (evt) => {
    evt.preventDefault();
    axios
      .post(
        "https://anytime-fitness.herokuapp.com/api/auth/register",
        formValues
      )
      .then((res) => {
        // console.log(res.data, "resdata");
        setUser([...users, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
    setFormValues({
      name: "",
      email: "",
      username: "",
      password: "",
      role: "",
    });
  };

  console.log(formValues, "user data");
  return (
    <div className="registration">
      {/* <form className="form container" onSubmit={onSubmit}> */}
      <div id="register-title">
        <h2>Registration</h2>
      </div>
      <div className="errors">
        <div>{formErrors.name}</div>
        <div>{formErrors.email}</div>
        <div>{formErrors.username}</div>
        <div>{formErrors.password}</div>
        <div>{formErrors.role}</div>
      </div>
      <div className="form inputs">
        <h4>General Information</h4>
        <form className="form container" onSubmit={onSubmit}>
          <label>
            Role:
            <select
              name="role"
              value={formValues.role}
              onChange={onInputChange}
            >
              <option value="">Select a Role</option>
              <option value="instructor">Instructor</option>
              <option value="student">Student</option>
            </select>
          </label>
          <label>
            Name:
            <input
              value={formValues.name}
              onChange={onInputChange}
              name="name"
              type="text"
            />
          </label>
          <label>
            Email:
            <input
              value={formValues.email}
              onChange={onInputChange}
              name="email"
              type="email"
            />
          </label>
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
          <div id="register-sub">
            <button className="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
