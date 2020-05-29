import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../../../utils/axiosWithAuth";
import { useParams, useHistory } from "react-router-dom";

const EditClass = (props) => {
  const [editClass, setEditClass] = useState([]);
  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    axiosWithAuth()
      .get(`/api/auth/users/classes/${id}`)
      .then((res) => {
        console.log(res.data, "res data");
        setEditClass(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (event) => {
    event.persist();
    let value = event.target.value;
    if (
      event.target.name === "max_size" ||
      event.target.name === "duration" ||
      event.target.name === "type"
    ) {
      value = parseInt(value);
    }
    setEditClass({
      ...editClass,
      [event.target.name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    axiosWithAuth()
      .put(`/api/auth/instructor/classes/${id}`, editClass)
      .then((res) => {
        // push("/");
      })
      .catch((err) => console.log(err));
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
      <h3>Edit your class</h3>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">
          Class Name
          <input
            id="name"
            type="text"
            name="name"
            value={editClass.name}
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
            value={editClass.instructor_name}
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
            value={editClass.type}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="intensity">
          Class intensity level - Low, Medium or High
          <input
            id="intensity"
            name="intensity"
            type="text"
            value={editClass.intensity}
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
            value={editClass.location}
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
            value={editClass.date}
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
            value={editClass.max_size}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="duration">
          Class Duration in minutes
          <input
            id="duration"
            type="number"
            name="duration"
            value={editClass.duration}
            onChange={handleChange}
            required
          />
        </label>

        <button>Submit</button>
      </form>
    </div>
  );
};

export default EditClass;
