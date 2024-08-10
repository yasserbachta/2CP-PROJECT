import React from "react";
import Grade from "./Grade";
import { grades } from "../../constants";
import useAuth from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

function GradesList() {
  const { Auth } = useAuth();

  if (Auth.role === "teacher") {
    return <Navigate to="/classes/teacher" />;
  }

  if (Auth.role === "student") {
    return (
      <Navigate
        to={`/classes/${Auth.grade}/${Auth.classe}/${Auth.classe_id}`}
      />
    );
  }
  return (
    <>
      <div className="hidden md:flex md:flex-col">
        <br />
        <br />
        <br />
      </div>
      <div className=" flex flex-col md:flex-row md:gap-0 gap-6 items-center justify-center ">
        {grades.map((grade) => (
          <Grade key={grade} grade={grade} />
        ))}
      </div>
    </>
  );
}

export default GradesList;
