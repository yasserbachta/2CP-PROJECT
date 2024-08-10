import React, { useState } from "react";
import { Arrowdown1, checkbox } from "../../assets";
import { useSort, useSelect } from "../../hooks";
import { Button } from "../ui";
import axios from "../../api/axios";
import useAuthTokens from "../../context/AuthTokens";
import refrechHandler from "../../context/refrechHandler";

const Listhead = ({ data }) => {
  const { setSelectedStudent, selectedStudent } = useSelect();
  const { sorted, toggle } = useSort();

  const checkAllHandler = () => {
    if (data.length === selectedStudent.length) {
      setSelectedStudent([]);
    } else {
      const postIds = data.map((item) => {
        return String(item.id);
      });

      setSelectedStudent(postIds);
    }
  };

  const { authTokens } = useAuthTokens();
  const { refStudentList, setRefStudentList } = refrechHandler();

  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleMultiDelete = async () => {
    console.log("multi delete request");
    console.log("selectedStudent: ", selectedStudent);
    console.log("authTokens: ", authTokens);

    try {
      setDeleteLoading(true);
      const res = await axios.delete(`/api/students/delete/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
        data: { students_ids: selectedStudent },
      });

      console.log(res);
      if (res.status === 200) {
        setSelectedStudent([]);
        setRefStudentList(!refStudentList);
      } else {
        console.log(res.status);
      }
      setDeleteLoading(false);
    } catch (err) {
      console.log(err);
      setDeleteLoading(false);
    }
  };

  return (
    <div className="*:font-poppins font-[500] *:text-blueTitle px-[20px] p-2 border-gray-300 w-full flex justify-between mb-2 *:text-[13px] items-center">
      <div className="flex w-[95%] gap-[20px] items-center">
        <input
          src={checkbox}
          className={` Stufu cursor-pointer border-2 rounded-[5px] w-[24px] h-[24px] border-pfpclr relative`}
          type="checkbox"
          onClick={checkAllHandler}
          checked={data.length === selectedStudent.length}
          onChange={() => {}} // to remove warning
        />
        {/* <img onClick={()=>{}} className={``} src={checkbox} alt="" /> */}
        <div className="w-[15vw] flex gap-2 items-center">
          <p>Name</p>
          <img
            onClick={() => {
              toggle();
            }}
            className={`cursor-pointer transition-all ${
              sorted ? " rotate-180" : ""
            }`}
            src={Arrowdown1}
            alt=""
          />
        </div>
        <div className="hidden md:block w-[13vw]">Contact</div>
        <div className="hidden md:block w-[8vw] pl-[7px]">
          <div className="w-[16vw]">
            <p>Grade</p>
          </div>
        </div>
        <div className="hidden md:block w-[11vw]">Parent Name</div>
        <div className="hidden md:block w-[8vw] pl-[10px] -ml-[10px]">
          Class
        </div>
      </div>
      <div className="h-[25px] flex items-center">
        {selectedStudent.length >= 2 ? (
          <span onClick={handleMultiDelete}>
            <Button
              loading={deleteLoading}
              data={{
                string: "Delete",
                style: `bg-red text-white font-poppins flex justify-center items-center ${
                  deleteLoading ? "gap-1" : "gap-2"
                } px-4 py-2 md:text-[16px] md:rounded-xl rounded-3xl `,
              }}
            />
          </span>
        ) : (
          "Action"
        )}
      </div>
    </div>
  );
};

export default Listhead;
