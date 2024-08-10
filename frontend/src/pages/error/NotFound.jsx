import React from "react";
import { useNavigate } from "react-router-dom";
import NoFoundAnimation from "./404/NoFoundAnimation";
const NotFound = () => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <div className="m-[15px] h-[105vh] sm:m-[30px] flex flex-col justify-center ">
      <div className="w-[50%] m-auto">
        <NoFoundAnimation />
        <div className="flex justify-center items-center flex-col">
          <p className="font-poppins text-[25px] font-[500] text-black text-center ">
            Page Not Found
          </p>
          <button
            className="text-center font-poppins text-[18px] text-white bg-primarypurp px-4 py-2 rounded-md mt-4"
            onClick={handleRedirect}
          >
            Go to Main Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
