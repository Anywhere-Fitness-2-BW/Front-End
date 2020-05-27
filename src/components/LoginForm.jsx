import React from "react";

export default function LoginForm(props) {
  const { values, onInputChange, onSubmit, disabled, errors } = props;

  return (
{/* <form className="form container" onSubmit={onSubmit}>
        <div>
          <h2>Log In</h2>
          <button disabled={disabled} className="submit">
            Login
          </button>
        </div>
        <div className="errors">
          <div>{errors.username}</div>
          <div>{errors.password}</div>
        </div>
        <div className="login form inputs">
          <h4>Login Information</h4>
          <label>
            Username:
            <input
              value={values.username}
              onChange={onInputChange}
              name="username"
              type="text"
            />
          </label>
          <label>
            Password:
            <input
              value={values.password}
              onChange={onInputChange}
              name="password"
              type="text"
            />
          </label>
        </div>
      </form> */}
    
  );
}


      
