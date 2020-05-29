import React from "react";
import { axiosWithAuth } from "../../../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";

const InstructorClass = (props) => {
  const { push } = useHistory();

  const deleteClass = (event) => {
    event.preventDefault();
    axiosWithAuth()
      .delete(`/api/auth/instructor/classes/${props.classList.id}`)
      .then((res) => {
        // console.log(res.data, "res");
        const newList = props.classList.filter(
          (classes) => classes.id !== res.data
        );
        props.setClassList(newList);
      })
      .catch((err) => console.log(err));
  };
  //   console.log(props.classList.id, "id console");
  return (
    <div className="class">
      <div>
        <p>Instructor Name: {props.classList.instructor_name}</p>
        <p>Class Name: {props.classList.name}</p>
        <p>Type: {props.classList.type}</p>
        <p>Date: {props.classList.date}</p>
        <p>Duration: {props.classList.duration}</p>
        <p>Intensity: {props.classList.intensity}</p>
        <p>Location: {props.classList.location}</p>
        <p>Number of Registered Attendees: {props.classList.signedUp}</p>
        <p>Max Number of Attendees: {props.classList.max_size}</p>
      </div>

      <button
        className="editBtn"
        onClick={() => push(`/editclass/${props.classList.id}`)}
      >
        Edit Class
      </button>
      <button className="deleteBtn" onClick={deleteClass}>
        Delete
      </button>
    </div>
  );
};

export default InstructorClass;
