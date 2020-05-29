import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../../../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";

const CreateClass = (props) => {
  const { push } = useHistory();
  const [createClassForm, setCreateClassForm] = useState({
    name: "",
    instructor_name: "",
    type: "",
    intensity: "",
    location: "",
    date: "",
    max_size: "",
    duration: "",
    signedUp: false,
  });

  const handleChange = (event) => {
    event.persist();
    let value = event.target.value;
    if (event.target.name === "max_size" || event.target.name === "duration") {
      value = parseInt(value, 10);
    }
    setCreateClassForm({
      ...createClassForm,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    axiosWithAuth()
      .post(`/api/auth/instructor/classes`, createClassForm)
      .then((res) => {
        console.log(res, "res");
        // push("/");
      })
      .catch((err) => console.log(err));
    setCreateClassForm({
      name: "",
      instructor_name: "",
      type: "",
      intensity: "",
      location: "",
      date: "",
      max_size: "",
      duration: "",
      signedUp: false,
    });
  };

  useEffect(() => {
    axiosWithAuth()
      .get(`api/auth/users/classes`)
      .then((res) => {
        console.log(res.data, "classes");
      })
      .catch((error) => {
        console.log("the data was not returned", error);
      });
  }, []);

  return (
    <div className="createContainer">
      <h3>Create a class</h3>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">
          Class Name
          <input
            id="name"
            type="text"
            name="name"
            value={createClassForm.name}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="instructor_name">
          Instructor Name
          <input
            id="instructor_name"
            type="text"
            name="instructor_name"
            value={createClassForm.instructor_name}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="type">
          Class Type - I.e - Boxing, HIIT, etc.
          <input
            id="type"
            type="text"
            name="type"
            value={createClassForm.type}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="intensity">
          Class intensity level - Low, Medium or High
          <input
            id="intensity"
            name="intensity"
            value={createClassForm.intensity}
            onChange={handleChange}
            required
          ></input>
        </label>

        <label htmlFor="location">
          Class Location
          <input
            id="location"
            name="location"
            type="text"
            value={createClassForm.location}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="date">
          Start Date - Required Format mm/dd/yyyy
          <input
            id="date"
            type="text"
            name="date"
            pattern="(0[1-9]|1[0-9]|2[0-9]|3[01])/(0[1-9]|1[012])/[0-9]{4}"
            value={createClassForm.date}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="max_size">
          Maximum # of participants
          <input
            id="max_size"
            name="max_size"
            type="number"
            value={createClassForm.max_size}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="duration">
          Class Duration in minutes
          <input
            id="duration"
            type="float"
            name="duration"
            value={createClassForm.duration}
            onChange={handleChange}
            required
          />
        </label>

        <button>Submit</button>
      </form>
    </div>
  );
};

export default CreateClass;
