import React from "react";
import { LogoW } from "../assets";
import Sidebaritem from "../components/sidebaritem";
import { Adminlist , Studentlist , Teacherlist } from "../constants";
import { Link , useLocation } from "react-router-dom";
import { useEffect , useState } from "react";
import { useSearch , useShowModal , useType } from "../hooks";
import useAuth from "../context/AuthContext";
const Sidebar = () => {
  const { Auth } = useAuth();
  const {setShowModal} = useShowModal()
  const {setType} = useType()
  const [pg, setPg] = useState('')
  const {  setSearch  } = useSearch();
  const location = useLocation();
  useEffect(() => {
     setPg(window.location.pathname.split('/')[1]);
     setSearch('');
     setShowModal(false)
     setType('')
  }, [location]);
  return (
    <aside className="hidden overflow-hidden sm:block min-h-screen sm:w-[75px] bg-primarypurp lg:w-[18%] sm:max-w-[270px] relative">
      <div className="fixed sm:w-[75px] lg:w-[18%] sm:max-w-[270px]">
        <nav className="min-h-screen flex flex-col items-center">
          <div
          className="mt-[25px] w-fit cursor-pointer" >
            <Link
              // onClick={setActive(-1)} 
              to={'/'}>
              <img className="ss:w-[50px] lg:w-[60px]" src={LogoW} alt="" />
            </Link>
          </div>
          <ul className="flex flex-col flex-1 items-center w-full mt-9 gap-3">
            {Auth.role == 'teacher' &&Teacherlist.map((item, index) => (
              <Sidebaritem  pg={pg} item={item} key={index} />
            ))}
            {Auth.role == 'admin' &&Adminlist.map((item, index) => (
              <Sidebaritem  pg={pg} item={item} key={index} />
            ))}
            {Auth.role == 'student' &&Studentlist.map((item, index) => (
              <Sidebaritem  pg={pg} item={item} key={index} />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
