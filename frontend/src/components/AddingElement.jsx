import { Button } from "./ui";
import { Plus } from "../assets";
import { memo } from "react";
import { useShowModal, useType } from "../hooks";
import useAuth from "../context/AuthContext";

function AddingElement({ user, onChange, page }) {
  const { setShowModal } = useShowModal();
  const { setType } = useType();

  const { Auth } = useAuth();

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <>
      <div
        className="relative flex justify-center 
        items-center gap-3 py-4 sm:py-2 w-[95%] sm:w-[75%] min-h-[110px] rounded-xl overflow-hidden bg-white px-2"
      >
        <div className="absolute top-0 w-full h-[10px] left-0 sm:h-full sm:w-[10px] bg-primarypurp"></div>
        <div className="flex flex-row items-center gap-4 p-2 sm:pl-[1.5%] rounded-full bg-bgpurp h-[50px] w-[60%] sm:w-[75%] sm:ml-[25px] sm:min-w-[220px] sm:h-[70px]">
          <div
            className={`bg-pfpclr rounded-full hidden sm:flex sm:items-center sm:justify-center w-[45px] h-[45px] min-w-[45px] sm:w-[55px] sm:h-[55px] sm:min-w-[55px] `}
          >
            {Auth?.pfp && (
              <img
                src={Auth.pfp}
                alt=""
                className={`rounded-full object-cover w-full h-full`}
              />
            )}
          </div>
          <input
            id="addEventInput"
            className=" text-center sm:text-left font-poppins font-[500] bg-transparent outline-none flex-1 min-w-[100px]"
            type="text"
            placeholder={`${
              page == "events" ? "Add Event" : "New Attachement ..."
            }`}
            onChange={(value) => handleChange(value)}
          />
        </div>
        <span
          onClick={() => {
            if (page == "events") {
              setShowModal(true);
              setType("AddEvent");
            }

            if (page == "classes") {
              setShowModal(true);
              setType("AddAttachement");
            }
          }}
        >
          <Button
            data={{
              style:
                ` cursor-pointer h-[50px] sm:h-[55px] w-[100px] sm:w-[130px] gap-3 flex justify-center items-center font-poppins text-white font-[400] bg-primarypurp rounded-[40px] ${page === "classes" ? 'w-[110px] sm:w-[140px]' : ''} `,
              string: `${page === "classes" ? "Create" : "Add"}`,
              icon: Plus,
              styleIcon: `w-[17px] h-[17px] rounded-[40px]`,
            }}
          />
        </span>
      </div>
    </>
  );
}

export default memo(AddingElement);
