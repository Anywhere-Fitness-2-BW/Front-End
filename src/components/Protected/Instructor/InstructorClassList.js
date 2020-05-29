import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../../../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import InstructorClass from "./InstructorClass";

const InstructorClassList = () => {
  const [classList, setClassList] = useState([]);
  const { push } = useHistory();

  useEffect(() => {
    if (classList.length !== setClassList.length)
      axiosWithAuth()
        .get(`api/auth/users/classes`)
        .then((res) => {
          setClassList(res.data.data);
        })
        .catch((error) => {
          console.log("the data was not returned", error);
        });
  }, []);

  return (
    <div className="cardContainer">
      <div className="cardList">
        <h1 className="insH1">Classes</h1>
        <button className="navBtn" onClick={() => push(`/createclass`)}>
          Create Class
        </button>
      </div>

      {classList.map((item) => {
        return <InstructorClass key={item.id} classList={item} />;
      })}
    </div>
  );
};

export default InstructorClassList;
