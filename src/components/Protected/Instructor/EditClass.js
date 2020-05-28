import React, { useState, useEffect } from "react";
import axiosWithAuth from "../../../utils/axiosWithAuth";
import { useParams, useHistory } from "react-router-dom";
import { ClassListContext } from "../../../contexts/ClassListContext";

const formDefault = {
  name: "",
  type: "",
  coursDetails: "",
  date: "",
  time: "",
  duration: "",
  intensity: "",
  location: "",
  max: "",
};

const EditClass = (props) => {
  console.log(props, "EditClass");
  const [editClass, setEditClass] = useState(formDefault);
  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    axiosWithAuth()
      .get(`/api/auth/users/classes/${id}`)
      .then((res) => {
        setEditClass(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (event) => {
    event.persist();
    let value = event.target.value;
    if (event.target.name === "max") {
      value = parseInt(value, 10);
    }
    setEditClass({
      ...editClass,
      [event.target.name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    axiosWithAuth()
      .put(`api/auth/instructor/${id}`, editClass)
      .then((res) => {
        const mergeArrayWithObject = (arr, obj) =>
          arr && arr.map((t) => (t.id === obj.id ? obj : t));
        updateColors(mergeArrayWithObject(colors, res.data));
        push(`classes/${id}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="createContainer">
      <h3>Create a class</h3>
      <form>
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

        <label htmlFor="classType">
          Class Type
          <select
            id="classType"
            name="classType"
            onChange={handleChange}
            required
          >
            <option></option>
            <option value={1}>Aerobic</option>
            <option value={2}>Physical</option>
            <option value={3}>Running</option>
            <option value={4}>Lifting</option>
            <option value={5}>Yoga</option>
            <option value={6}>HIIT</option>
            <option value={7}>Bootcamp</option>
            <option value={8}>Barre</option>
            <option value={9}>Conditioning</option>
            <option value={10}>Stretch</option>
            <option value={11}>Zumba</option>
            <option value={12}>Sport</option>
            <option value={13}>Pilates</option>
          </select>
        </label>

        {/* <label htmlFor="courseDetails">
          Course Description
          <input
            id="coursDetails"
            type="text"
            name="coursDetails"
            value={createClassForm.courseDetails}
            onChange={handleChange}
          />
        </label> */}

        <label htmlFor="date">
          Start Date - Required Format mm-dd-yyyy
          <input
            id="date"
            type="text"
            name="date"
            pattern="(0[1-9]|1[0-9]|2[0-9]|3[01])-(0[1-9]|1[012])-[0-9]{4}"
            value={editClass.date}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="time">
          Class Time
          <input
            id="time"
            type="time"
            name="time"
            value={editClass.time}
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

        <label htmlFor="intensity">
          Class intensity level
          <select
            id="intensity"
            name="intensity"
            value={editClass.intensity}
            onChange={handleChange}
            required
          >
            <option></option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
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

        <label htmlFor="max">
          Maximum # of participants
          <input
            id="max"
            name="max"
            type="number"
            value={editClass.max}
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
