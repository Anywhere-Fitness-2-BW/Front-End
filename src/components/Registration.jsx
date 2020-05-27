import React, { useState, useEffect } from "react";
import UserForm from "./UserForm";
import formSchema from "../validation/formSchema";
import axios from "axios";
import * as yup from "yup";

const initialFormValues = {
    fullName:'',
    email:'',
    username:'',
    password:'',
    role:'',
}
const initialFormErrors = {
    fullName:'',
    email:'',
    username:'',
    password:'',
    role:'',
}
const initialDisabled= true;
const initialUsers = [];

export default function Registration() {
    const [users, setUser] = useState(initialUsers);
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    const [disabled, setDisabled] = useState(initialDisabled);

  

    // const getUsers = () => {
    //     axios
    //       .get("https://anytime-fitness.herokuapp.com/api/")
    //       .then((res) => {
    //         setUser(res.data);
    //         console.log(res.data)
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   };
      const postNewUser = (newUser) => {
        axios
          .post("https://anytime-fitness.herokuapp.com/api/auth/register", newUser)
          .then((res) => {
            setUser([res.data, ...users]);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setFormValues(initialFormValues);
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
    
        const newUser = {
          name: formValues.fullName.trim(),
          email: formValues.email.trim(),
          username: formValues.username.trim(),
          password: formValues.password.trim(),
          role: formValues.role.trim(),
        };
        postNewUser(newUser);
      };
    
      useEffect(() => {
        // getUsers();
        console.log(users)
        console.log(formValues)
        console.log(formErrors)
        console.log(disabled)
      }, []);
      
    
      useEffect(() => {
        formSchema.isValid(formValues).then((valid) => {
          setDisabled(!valid);
        });
      }, [formValues]);
    
      return (
        <div className="registration container">
          <div>
              
          <UserForm
            values={formValues}
            onInputChange={onInputChange}
            onSubmit={onSubmit}
            disabled={disabled}
            // errors={formErrors}
          />
          </div>
        </div>
      );
    }

