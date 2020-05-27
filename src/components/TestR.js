import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
// import { axiosWithAuth } from "../../Utils/AxiosWithAuth";
// import RadioButtonsGroup from "../Test/Test";
// import formSchema from './validation/formSchema'
import * as yup from "yup";

const initialState = {
  username: "",
  password: "",
};

const initialFormErrors = {
  username: "*Username is required",
  password: "*Password is required",
};

const formSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "*Username must include at least 3 characters")
    .required("*Username is required"),
  password: yup
    .string()
    .min(4, "*Password must include at least 4 characters")
    .required("*Password is required"),
});
export default function SignUp(props) {
  const match = useRouteMatch("/register");
  const [newUser, setNewUser] = useState({});
  const [newUserFormErrors, setNewUserFormErrors] = useState(initialFormErrors);
  const [buttonEnabled, setButtonEnabled] = useState(false);

  useEffect(() => {
    formSchema.isValid(newUser).then((valid) => {
      setButtonEnabled(valid);
    });
  }, [newUser]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    
    setNewUser({ ...newUser, [name]: value });
    yup
      .reach(formSchema, name)
      .validate(value)
      .then((valid) => {
        setNewUserFormErrors({ ...newUserFormErrors, [name]: "" });
      })
      .catch((err) => {
        setNewUserFormErrors({
          ...newUserFormErrors,
          [name]: err.errors[0],
        });
      });
  };
  const onSignup = (event) => {
    event.preventDefault();
    // if (confirmPass === newUser.password) {
    //   axiosWithAuth()
    //     .post("http://localhost:5000/api/users", newUser)
    //     .then((res) => {
    //       console.log("you signed up!");
    //     })
    //     .catch((err) => {
    //       console.log("there was an error signing up -->", err);
    //     });
    // }
//   };
  return (
    <div className="registration">
      <h3>SignUp Now!</h3>
      <form>
      <label>
          Enter your name
          <br />
          <input
            type="text"
            placeholder="Steve Bob"
            onChange={handleChange}
          />
        </label>
        <label>
          Enter Email
          <br />
          <input
            type="email"
            name="email"
            placeholder="email@email.com"
            onChange={handleChange}
          />
        </label>
        <label>
          Create a Username
          <br />
          <input
            type="text"
            name="username"
            placeholder="12345"
            onChange={handleChange}
          />
        </label>
        <div className="form-errors">{newUserFormErrors.username}</div>
        <br />
        <br />
        <button newUser={newUser} setNewUser={setNewUser} />
        <br />
        <br />
        <label>
          Create a Password
          <br />
          <input
            type="password"
            placeholder="123456"
            name="password"
            onChange={handleChange}
          />
        </label>
        <div className="form-errors">{newUserFormErrors.password}</div>
        <br />
        <br />
        <button onClick={onSignup}>Create Account!</button>
        {/* <div className="form-errors">{newUserFormErrors.username}</div> */}
        {/* <div className="form-errors">{newUserFormErrors.password}</div> */}
      </form>
    </div>
  );
  }
}
