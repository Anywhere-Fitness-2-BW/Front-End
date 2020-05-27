import React from "react";

export default function UserForm(props) {
  const {
    values,
    onInputChange,
    onSubmit,
    disabled,
    errors,
  } = props;

  return (
    <div>
    <form className='form container' onSubmit={onSubmit}>
      <div>
        <h2>Sign Up</h2>
        <button disabled={disabled} className="submit">
          Submit
        </button>
      </div>
      <div className="errors">
        <div>{errors.name}</div>
        <div>{errors.email}</div>
        <div>{errors.username}</div>
        <div>{errors.password}</div>
        <div>{errors.role}</div>
      </div>
      <div className="form inputs">
        <h4>General Information</h4>
        <label>
          Role:
          <select name="role" value={values.role} onChange={onInputChange}>
            <option value="">Select a Role</option>
            <option value="instructor">Instructor</option>
            <option value="student">Student</option>
          </select>
        </label>
        <label>
          Name:
          <input
            value={values.name}
            onChange={onInputChange}
            name="name"
            type="text"
          />
        </label>
        <label>
          Email:
          <input
            value={values.email}
            onChange={onInputChange}
            name="email"
            type="email"
          />
        </label>
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
    </form>
 </div>
  );
}
