import React from "react";
import { Adminlist, Studentlist, Teacherlist } from "../constants";
import Sidebaritem from "../components/sidebaritem";
import { useType, useSearch, useShowModal } from "../hooks";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../context/AuthContext";
const Bottombar = () => {
  const { Auth } = useAuth();
  const { setShowModal } = useShowModal();
  const { setType } = useType();
  const [pg, setPg] = useState("");
  const { setSearch } = useSearch();
  const location = useLocation();
  useEffect(() => {
    setPg(window.location.pathname.split("/")[1]);
    setSearch("");
    setShowModal(false);
    setType("");
  }, [location]);
  return (
    <div className=" z-20 fixed bottom-0 left-0 w-screen h-[75px] bg-primarypurp sm:hidden">
      <ul className="flex items-center justify-evenly h-full">
        {Auth.role == "teacher" &&
          Teacherlist.map((item, index) => (
            <Sidebaritem pg={pg} item={item} key={index} />
          ))}
        {Auth.role == "admin" &&
          Adminlist.map((item, index) => (
            <Sidebaritem pg={pg} item={item} key={index} />
          ))}
        {Auth.role == "student" &&
          Studentlist.map((item, index) => (
            <Sidebaritem pg={pg} item={item} key={index} />
          ))}
      </ul>
    </div>
  );
};

export default Bottombar;
