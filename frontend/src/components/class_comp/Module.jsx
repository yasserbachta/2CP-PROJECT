import React from "react";
import { Devoir, Courses } from "../../assets";
import { SmallButton } from "../ui";
import { Link } from "react-router-dom";
import { useAtchh } from "../../hooks";

const Module = ({ Module, moduleId }) => {
  const { setatchh } = useAtchh();

  return (
    <Link
      to={`${window.location.pathname}/${Module.toLowerCase()}/${moduleId}`}
      className="md:w-1/3 w-[90%] transition max-w-[290px] md:max-w-[280px] rounded-[20px] outline outline-primarypurp hover:outline-[2px] outline-[0.5px] cursor-pointer"
    >
      <div className="h-[70px] rounded-t-[20px] bg-primarypurp relative overflow-hidden flex justify-start items-center pl-5">
        <p className="max-w-[125px] text-wrap absolute font-poppins text-[23px] font-[600] text-white leading-[25px]">
          {Module}
        </p>
        <div className="absolute h-[100px] w-[100px] rounded-full bg-yellow top- right-[-8px]"></div>
        <div className="absolute h-[100px] w-[100px] top-4 rounded-full bg-orange right-[-3px]"></div>
      </div>
      <div className="relative h-[140px] bg-white rounded-b-[20px] flex justify-end items-end px-4 py-3">
        <div className="w-[65px] h-[65px] outline-white outline outline-[4px] absolute top-[-25px] bg-pfpclr rounded-full"></div>
        <div className="flex gap-3">
          <span
            onClick={() => {
              setatchh("Devoir");
            }}
          >
            <SmallButton
              picture={Devoir}
              altText={"Devoir"}
              hoverText={"Devoir"}
              color={"#4D44B5"}
              size={"40px"}
            />
          </span>
          <span onClick={() => setatchh("Cours")}>
            <SmallButton
              picture={Courses}
              altText={"Cours"}
              hoverText={"Cours"}
              color={"#4D44B5"}
              size={"40px"}
            />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Module;
