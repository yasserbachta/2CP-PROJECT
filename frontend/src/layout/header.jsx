import React from "react";
import Title from "../components/ui/Title";
import { Gear, Bell, logout } from "../assets";
import LogoutButton from "./logoutButton";
import useAuth from "../context/AuthContext";
import { TeacherPicture } from "../components/ui";
import { useState } from "react";
import { Link } from "react-router-dom";
const Header = ({ title }) => {
  const [show, setShow] = useState(false);
  const { Auth } = useAuth();
  // console.log(Auth)
  return (
    <div className="relative flex justify-between items-center font-poppins">
      <Title Title={title} />
      <div className="flex items-center gap-3 ">
        {/* <div className="w-[45px] h-[45px] relative">
          <span className="w-2 h-2 absolute bg-primarypurp rounded-full right-2 top-[7px] z-10"></span>
          <img
            src={Bell}
            alt="Settings"
            className="rounded-full p-3 bg-white cursor-pointer"
          />
        </div> */}

        <div className="hidden sm:flex flex-col items-end">
          <p className="font-[600] text-blueTitle text-[14px]">
            {Auth.nom === "" ? "Username" : Auth.nom} {Auth.prénom[0]}.
          </p>
          <p className="text-[13px] text-textgray2">{Auth.role}</p>
        </div>
        <div
          onClick={() => {
            setShow(!show);
          }}
        >
          <TeacherPicture
            krahti={false}
            pfp={Auth.pfp}
            size="48px"
            extraClassName={`cursor-pointer hover:border-primarypurp hover: border-solid hover:border-[3px] transition-all ${
              show ? "border-primarypurp border-solid border-[3px]" : ""
            }`}
          />{" "}
        </div>
      </div>
      {show && <Dropdown />}
    </div>
  );
};

export default Header;

const Dropdown = () => {
  const { Auth } = useAuth();
  return (
    <div className="absolute z-10 right-[-8px] rounded-md bg-white w-[150px] top-[60px] flex flex-col  ">
      {Auth.role != 'admin' && <div className=" hover:bg-[#FCC43E]  h-[50px] gap-2 rounded-t-md opacity-90 flex items-center justify-center hover:cursor-pointer p-2 transition-all">
        <img src={Bell} className="w-[25px]" alt="" />
         <Link to={'/notifications'} className="text-black  font-semibold">Notification</Link>
      </div>}
      <LogoutButton />
    </div>
  );
};
