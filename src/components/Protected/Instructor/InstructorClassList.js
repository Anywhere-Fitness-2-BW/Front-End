import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../../../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import InstructorClass from "./InstructorClass";

const InstructorClassList = () => {
  const [classList, setClassList] = useState([]);
  const { push } = useHistory();

  useEffect(() => {
    axiosWithAuth()
      .get(`api/auth/users/classes`)
      .then((res) => {
        // console.log(res.data, "classes");
        setClassList(res.data.data);
      })
      .catch((error) => {
        console.log("the data was not returned", error);
      });
  }, []);

  //   console.log(classList, "cl");

  return (
    <div>
      <div>Classes</div>
      <button className="classBtn" onClick={() => push(`/createclass`)}>
        Create Class
      </button>
      {classList.map((item) => {
        // console.log(item, "item");
        return <InstructorClass key={item.id} classList={item} />;
      })}
    </div>
  );
};

export default InstructorClassList;
