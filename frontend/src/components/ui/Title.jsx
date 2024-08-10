import React from "react";
import { LogoP } from "../../assets";
const Title = ({ Title }) => {
  return (
    <div className="flex items-center gap-[6px]">
      <img
        src={LogoP}
        alt="Logo"
        className="w-[50px] h-[50px] mr-2 sm:hidden"
      />
      <h1 className="text-[26px] font-bold text-blueTitle sm:text-[30px]">
        {Title}
      </h1>
    </div>
  );
};

export default Title;
