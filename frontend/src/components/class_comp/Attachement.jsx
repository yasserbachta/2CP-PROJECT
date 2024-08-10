import React from "react";
import { attached } from "../../assets";
import { Link } from "react-router-dom";

const Attachement = ({ data, hoverEffect = true, link = true }) => {
  //data proprties names will be changed
  if (link) {
    return (
      <Link
        to={`${window.location.pathname}/${data.title}/${data.id}`}
        className={`flex gap-3  transition ease-in-out delay-50 ${
          hoverEffect ? "hover:scale-[1.01] cursor-pointer" : ""
        } `}
      >
        <img
          className={`bg-primarypurp  rounded-full ${
            hoverEffect ? "w-[50px] h-[50px] p-2" : "w-[60px] h-[60px] p-3"
          }`}
          src={attached}
          alt=""
        />
        <div className="flex flex-col font-poppins">
          <p
            className={`font-[600] text-[#363B64] ${
              hoverEffect ? "text-[18px]" : "text-[20px]"
            }`}
          >
            {data.title}
          </p>
          <p className="text-[14px] text-[#A7A7A7]">
            {data.created.substring(0, 10)}
          </p>
        </div>
      </Link>
    );
  } else {
    //this part needs to be fixed
    return (
      <div
        className={`flex gap-3  transition ease-in-out delay-50 ${
          hoverEffect ? "hover:scale-[1.01] cursor-pointer" : ""
        } `}
      >
        <img
          className={`bg-primarypurp  rounded-full ${
            hoverEffect ? "w-[50px] h-[50px] p-2" : "w-[60px] h-[60px] p-3"
          }`}
          src={attached}
          alt=""
        />
        <div className="flex flex-col font-poppins">
          <p
            className={`font-[600] text-[#363B64] ${
              hoverEffect ? "text-[18px]" : "text-[20px]"
            }`}
          >
            {data.title}
          </p>
          <p className="text-[14px] text-[#A7A7A7]">
            {data.created ? data.created.substring(0, 10) : data.created}
          </p>
        </div>
      </div>
    );
  }
};

export default Attachement;
