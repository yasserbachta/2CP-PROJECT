import React from "react";
import { EyeIcon } from "@heroicons/react/24/solid";
import { EyeSlashIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
const Input = ({ data }) => {
  const [show, setShow] = useState(false);
  return (
    <div className=" w-[70%] max-w-[400px] relative select-none">
      <input
        name={data.name ? data.name : ""}
        className={`py-[20px] pl-[25px] w-full border bg-bgpurp border-borderColor rounded-[5px] text-[15px] sm:text-[18px] font-kumbhfont font-medium placeholder:text-textgray focus:border-borderColor focus:outline-none ${
          navigator.userAgent.indexOf("Edg") == "-1" && data.type == "password"
            ? "pr-[50px]"
            : "pr-5"
        }`}
        type={
          data.type == "password" ? (show ? "text" : "password") : data.type
        }
        placeholder={data.string}
      />
      {data.type == "password" ? (
        show ? (
          <EyeSlashIcon
            onClick={() => setShow(!show)}
            className={` ${
              navigator.userAgent.indexOf("Edg") == "-1" ? "block" : "hidden"
            } h-[25px] absolute right-[15px] top-[21px] text-textgray cursor-pointer`}
          />
        ) : (
          <EyeIcon
            onClick={() => setShow(!show)}
            className={` ${
              navigator.userAgent.indexOf("Edg") == "-1" ? "block" : "hidden"
            } h-[25px] absolute right-[15px] top-[21px] text-textgray cursor-pointer`}
          />
        )
      ) : (
        ""
      )}
    </div>
  );
};
export default Input;
