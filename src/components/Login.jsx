import React, { useState, useEffect } from "react";
import LoginForm from "./UserForm";
import formSchema from "../validation/formSchema";
import axios from "axios";
import * as yup from "yup";

const initialFormValues = {
    username:'',
    password:'',
}
const initialFormErrors = {
    username:'',
    password:'',
}
const initialDisabled= true;
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
          <LoginForm
            values={formValues}
            onInputChange={onInputChange}
            onSubmit={onSubmit}
            disabled={disabled}
            errors={formErrors}
          />
          </div>
        </div>
      );
    }

