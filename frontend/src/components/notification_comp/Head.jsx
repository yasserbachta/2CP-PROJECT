import React from "react";
import { dots } from "../../assets";
import { useState } from "react";
const Head = ({ active, setActive }) => {
  const [show  , setShow] = useState(false)
  return (
    <div className="px-5 pb-5 pt-1 border-b-2 font-poppins ">
      <div className="flex flex-row-reverse justify-between items-center">
        <div className="flex-1 sm:hidden flex justify-end relative">
          <img onClick={() => setShow(!show)} className="cursor-pointer " src={dots} alt="" />
          {show && <div><Buttons view={'Mobile'} /></div>}
        </div>
        <Buttons view={'Desktop'} />
        <div className="flex items-center gap-3 ">
          <button onClick={() => setActive("All")}
            className={` text-base text-gray-500 font-[600] ${
              active == "All" ? "text-primarypurp" : ""
            }`}
          >
            All
          </button>
          <button onClick={() => setActive("Unread")}
            className={` text-base text-gray-500 font-[600] ${
              active == "Unread" ? "text-primarypurp" : ""
            }`}
          >
            Unread
          </button>
        </div>
      </div>
    </div>
  );
};

export default Head;


const Buttons = ({view}) => {
  return (
    <div className={`${view == 'Mobile' ? 'absolute top-[19px] z-10 right-[5px] ' : 'justify-between items-center hidden sm:flex'}`}>
    <div className={`${view == 'Mobile' ? 'flex flex-col gap-2' : 'flex items-center gap-3'} `}>
      <button className={`bg-gray-100 px-3  rounded-md text-sm ${view == 'Mobile' ? 'py-2' : 'py-1'}`}>
        Mark all as read
      </button>
      <button className={` ${view == 'Mobile' ? 'py-2' : 'py-1'} bg-red px-3 py-1 text-white rounded-md text-sm`}>
        Clear all
      </button>
    </div>
  </div>
  )
}

