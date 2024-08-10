import React from "react";
import { Phone, dots } from "../../assets";
import { ClassBox, SmallButton } from "../ui";
import { Edit, Delete, Absent, checkbox } from "../../assets";
import { useType, useShow, useShowModal, useSelect } from "../../hooks";
const Studentitem = ({ data }) => {
  const { selectedStudent, setSelectedStudent, uncheckedStudent } = useSelect();
  const { setShowModal } = useShowModal();
  const { show, setShow } = useShow();
  const { setType } = useType();
  const heightStyle = {
    height: "calc(100% + 33px)",
  };
  // console.log(typeof(String(data.id)))
  // console.log(selectedStudent)
  const checkboxHandler = (e) => {
    const isSelected = e.target.checked;
    const value = e.target.value;
    // console.log(isSelected, value)
    if (isSelected) {
      setSelectedStudent([...selectedStudent, value]);
    } else {
      uncheckedStudent(value);
    }
  };
  return (
    <div className="*:font-poppins px-[20px] p-2 border-gray-300 w-full flex justify-between items-center  py-4 border-b-[0.5px] ">
      <div className="flex w-[95%] gap-[20px] items-center relative">
        <div>
          <input
            src={checkbox}
            value={String(data.id)}
            className={`Stufu cursor-pointer border-2 rounded-[5px] w-[24px] h-[24px] border-pfpclr`}
            type="checkbox"
            onChange={checkboxHandler}
            checked={selectedStudent.includes(String(data.id))}
          />
          <img
            className="absolute sm:top-[5px] hidden bg-primarypurp w-[24px] h-[24px] rounded-[5px] p-1"
            src={checkbox}
            alt=""
          />
        </div>
        <div
          className={`absolute w-[4px] bg-primarypurp -left-[20px] ${
            selectedStudent.includes(String(data.id)) ? "block" : "hidden"
          }`}
          style={heightStyle}
        ></div>
        <div className="w-[15vw]">
          <p className="  sm:text-[18px] font-[600] text-blueTitle min-w-[190px]">
            {data.lastName} {data.firstName}
          </p>
        </div>
        <div className="hidden md:block w-[13vw]">
          <div className="flex items-center gap-3">
            <div className=" bg-bgpurp p-[7px] rounded-full">
              <img className="" src={Phone} alt="" />
            </div>
            <p className="text-primarypurp font-[600] text-[15px]">
              {data.contact || "N/A"}
            </p>
          </div>
        </div>
        <div className="hidden md:block w-[8vw]">
          <div className="w-fit">
            <ClassBox
              color={`${
                data.grade == "LYCEE" || data.grade == "S"
                  ? "#4D44B5"
                  : data.grade == "CEM" || data.grade == "M"
                  ? "#FB7D5B"
                  : "#FCC43E"
              }`}
              style="text-white py-2 px-4 rounded-[19px]"
              grade={data.grade}
            />
          </div>
        </div>
        <div className="hidden md:block w-[11vw]">
          <p className="text-[14px] font-[500] text-blueTitle">
            {data.parentName}
          </p>
        </div>
        <div className="hidden md:block w-[8vw] -ml-[10px]">
          <div className="w-fit">
            <ClassBox
              color={`${
                data.grade == "LYCEE" || data.grade == "S"
                  ? "#4D44B5"
                  : data.grade == "CEM" || data.grade == "M"
                  ? "#FB7D5B"
                  : "#FCC43E"
              }`}
              style="text-white py-2 px-4 rounded-[19px]"
              theclass={data.classe}
            />
          </div>
        </div>
      </div>
      <div className={`flex flex-row-reverse gap-3 relative left-0 `}>
        <img
          onClick={() => {
            setShowModal(true);
            setShow(data.id);
            setType("DeleteS");
          }}
          className={`md:hidden w-[25px] h-[25px] cursor-pointer `}
          src={dots}
        />
        <img
          onClick={() => {
            if (show == data.id) {
              setShow("");
            } else {
              setShow(data.id);
            }
          }}
          className={`hidden md:block w-[25px] h-[25px] cursor-pointer transition-all ${
            show === data.id ? "translate-x-2" : ""
          } `}
          src={dots}
        />
        <div
          className={` absolute right-[26px] -top-2 p-1  transition-all rounded-[14px] gap-2 hidden ${
            show == data.id ? "md:flex" : "hidden"
          }`}
        >
          <div
            onClick={() => {
              setShowModal(true);
              setShow(data.id);
              setType("DeleteS");
            }}
          >
            <SmallButton
              picture={Delete}
              altText="Delete"
              hoverText="Delete"
              color={"#FF4550"}
              size={"30px"}
            />
          </div>
          <div
            onClick={() => {
              setShowModal(true);
              setShow(data.id);
              setType("Edit");
            }}
          >
            <SmallButton
              picture={Edit}
              altText="Edit"
              hoverText="Edit"
              color={"#FB7D5B"}
              size={"30px"}
            />
          </div>
          <div
            onClick={() => {
              setShowModal(true);
              setShow(data.id);
              setType("Absence");
            }}
          >
            <SmallButton
              picture={Absent}
              altText="Absence"
              hoverText="Absence"
              color={"#4D44B5"}
              size={"30px"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Studentitem;
