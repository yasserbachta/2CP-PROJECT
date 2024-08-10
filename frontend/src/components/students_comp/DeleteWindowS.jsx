import React, { useState } from "react";
import { ClassBox, Button } from "../ui";
import { Edit, Absent } from "../../assets";
import { useType, useShowModal, useShow } from "../../hooks";
import axios from "../../api/axios";
import useAuthTokens from "../../context/AuthTokens";
import refrechHandler from "../../context/refrechHandler";
import useLoadingS from "../../context/studentsLoading";
import { TeacherPicture } from "../ui";

const DeletWindowS = ({ data }) => {
  const { setType } = useType();
  const { setShowModal } = useShowModal();
  const { setShow } = useShow();
  const { authTokens } = useAuthTokens();
  const { refStudentList, setRefStudentList } = refrechHandler();
  const { setLoading } = useLoadingS();

  const [loading, setLocalLoading] = useState(false);

  const deleteRequest = () => {
    console.log("delete request");
    setLocalLoading(true);
    axios
      .delete(`/api/students/${data.id}/delete`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setShowModal(false);
          setType("");
          setRefStudentList(!refStudentList);
          setLocalLoading(false);
        } else {
          console.log(res.status);
        }
      })
      .catch((err) => {
        console.log(err);
        setLocalLoading(false);
      });
  };

  return (
    <div className="flex flex-col justify-center md:items-center items-start bg-white px-8 py-5 rounded-lg gap-5">
      <div className="flex items-center gap-2 md:flex-col md:justify-center  ">
        <div className="w-[40px] h-[40px] bg-pfpclr rounded-full">
          <TeacherPicture
            krahti={false}
            pfp={data.pfp}
            size="40px"
            extraClassName=""
          />
        </div>
        <p className=" sm:text-[18px] font-[600] text-blueTitle">
          {data.lastName} {data.firstName}
        </p>
      </div>
      <div className="flex flex-col gap-3 md:hidden">
        <div className="flex items-center gap-2">
          <p className="font-poppins text-[16px] text-blueTitle font-[600]">
            Contact :{" "}
          </p>
          <p className="text-[18px] text-primarypurp font-[600]">
            {data.contact}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p className="font-poppins text-[16px] text-blueTitle font-[600]">
            ParentName :{" "}
          </p>
          <p className="ttext-[14px] font-[500] text-blueTitle">
            {data.parentName}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p className="font-poppins text-[16px] text-blueTitle font-[600]">
            Grade :{" "}
          </p>
          <ClassBox
            color={`${
              data.grade == "LYCEE"
                ? "#999CD7"
                : data.grade == "CEM"
                ? "#FC997F"
                : "#FDD985"
            }`}
            style="text-white text-[15px] py-1 px-2 rounded-[19px]"
            theclass={data.grade}
          />
        </div>
        <div className="flex items-center gap-2">
          <p className="font-poppins text-[16px] text-blueTitle font-[600]">
            Class :{" "}
          </p>
          <ClassBox
            color={`${
              data.grade == "LYCEE"
                ? "#999CD7"
                : data.grade == "CEM"
                ? "#FC997F"
                : "#FDD985"
            }`}
            style="text-white text-[15px] py-1 px-3 rounded-[19px]"
            theclass={data.classe}
          />
        </div>
      </div>
      <div className="w-full flex items-center justify-center gap-3">
        <div
          onClick={() => {
            setType("Edit");
          }}
        >
          <Button
            data={{
              string: "Edit",
              icon: Edit,
              style:
                "flex bg-orange text-white font-poppins  gap-2 px-4 py-2 rounded-3xl md:hidden",
            }}
          />
        </div>
        <div
          onClick={() => {
            setShowModal(false);
            setType("");
          }}
        >
          <Button
            data={{
              string: "Cancel",
              style:
                "bg-[#F1F1F1] text-black font-poppins  gap-2 px-4 py-2 rounded-3xl hidden md:block md:text-[19px] md:rounded-xl ",
            }}
          />
        </div>
        <div onClick={deleteRequest}>
          <Button
            loading={loading}
            data={{
              string: "Delete",
              style: `cursor-pointer flex justify-center items-center bg-red text-white font-poppins  ${
                loading ? "gap-1" : "gap-1"
              } px-4 py-2 md:text-[19px] md:rounded-xl rounded-3xl `,
            }}
          />
        </div>
        <div
          onClick={() => {
            setShowModal(true);
            setShow(data.id);
            setType("Absence");
          }}
        >
          <Button
            data={{
              string: "Absence",
              icon: Absent,
              style:
                " flex bg-primarypurp text-white font-poppins  gap-2 px-4 py-2 rounded-3xl md:hidden",
              styleIcon: "w-[19px]",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DeletWindowS;
