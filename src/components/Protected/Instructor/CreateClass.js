import React, { useState, useContext } from "react";
import axiosWithAuth from "../../../utils/axiosWithAuth";
import { ClassListContext } from "../../../contexts/ClassListContext";

const CreateClass = (props) => {
  const { classList, setClassList } = useContext(ClassListContext);

  const [createClassForm, setCreateClassForm] = useState({
    id: Date.now(),
    name: "",
    type: "",
    coursDetails: "",
    date: "",
    time: "",
    duration: "",
    intensity: "",
    location: "",
    max: "",
  });

  const handleChange = (event) => {
    setCreateClassForm({
      ...createClassForm,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    axiosWithAuth()
      .put(`/api/auth/instructor`, )
      .then((res) => {
        const mergeArrayWithObject = (array, object) =>
          //check to make sure array is there
          array &&
          //map through the array
          array.map((object) =>
            //make sure edited movie id matches current object in the array - if true replace movie object otherwise use original array object
            object.id === array.id ? object : array
          );
        props.setClassList(mergeArrayWithObject(, ));
        push(``);
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
            value={createClassForm.name}
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
            value={createClassForm.date}
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
            value={createClassForm.time}
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
            value={createClassForm.duration}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="intensity">
          Class intensity level
          <select
            id="intensity"
            name="intensity"
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
            value={createClassForm.location}
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
            value={createClassForm.max}
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
