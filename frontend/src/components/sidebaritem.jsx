import React from "react";
import { Link } from "react-router-dom";
const Sidebaritem = ({ item, pg }) => {
  return (
    <Link
      to={item.theLink}
      className={` cursor-pointer hover:scale-105 transition-all select-none lg:w-full p-3 lg:p-5 lg:rounded-tl-[30px] lg:rounded-bl-[30px] lg:ml-[30px] rounded-full lg:rounded-none  ${
        pg === item.title.toLowerCase() ? "bg-bgpurp" : ""
      } `}
      key={item.title}
    >
      <div className={`flex items-center gap-6 `}>
        <img
          className="w-[30px] h-[30px]"
          src={pg === item.title.toLowerCase() ? item.svgSelected : item.svg}
          alt=""
        />
        <p
          className={`text-[18px] font-[500] hidden lg:block ${
            pg === item.title.toLowerCase() ? "text-primarypurp" : "text-pfpclr"
          }
           font-kumbhfont text-pfpclr`}
        >
          {item.title}
        </p>
      </div>
    </Link>
  );
};

export default Sidebaritem;
