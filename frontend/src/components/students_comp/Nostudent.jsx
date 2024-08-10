import React from "react";
import { NoStudent } from "../../assets";

const Nostudent = () => {
  return (
    <>
      <img className="w-[612px]" src={NoStudent} alt="" />
      <div className="flex flex-col items-center *:font-kumbhfont *:text-headcolor">
        <p className=" text-center text-[33px] font-[600]">
          No students at this time
        </p>
        <p className=" text-center  text-[19px]">
          Students will appear here after they enroll in your school.
        </p>
      </div>
    </>
  );
};

export default Nostudent;
