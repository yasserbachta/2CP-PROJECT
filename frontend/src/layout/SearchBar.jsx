import React from "react";
import { Search } from "../assets";
import { useSearch } from "../hooks";
const SearchBar = ({ chatCall = false}) => {
  const { setSearch } = useSearch();
  return (
    <div className={` ${chatCall ? '' : 'w-[70%] '} relative max-w-[350px] border rounded-[40px]`} >
      <input
        className="sm:h-[55px] h-[50px] w-full rounded-[40px] pl-[60px] outline-none font-poppins font-[500] pr-3"
        type="text"
        placeholder="Search Here ..."
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <img
        className="absolute top-[10px] sm:top-[12px] left-[15px]"
        src={Search}
        alt=""
      />
    </div>
  );
};

export default SearchBar;
