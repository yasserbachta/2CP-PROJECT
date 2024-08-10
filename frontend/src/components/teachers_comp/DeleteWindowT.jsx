import React, { useState } from "react";
import { TeacherPicture } from "../ui";
import { useShowModal, useType } from "../../hooks";
import useAuthTokens from "../../context/AuthTokens";
import axios from "../../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner } from "@nextui-org/react";
import refrechHandler from "../../context/refrechHandler";

const DeleteWindowT = ({ data }) => {
  const { setShowModal } = useShowModal();
  const { setType } = useType();
  const { refTeacherList, setRefTeacherList } = refrechHandler();
  const { authTokens } = useAuthTokens();

  const navigate = useNavigate();

  const { id } = useParams();
  console.log(id);

  const [loading, setLoading] = useState(false);

  const deleteRequest = () => {
    console.log("delete request");
    setLoading(true);
    axios
      .delete(`/api/teachers/${id}/delete`, {
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
          setLoading(false);
          setRefTeacherList(!refTeacherList);
          navigate(-1);
        } else {
          console.log(res.status);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white p-10 rounded-lg ">
      <p>Are you sure you want to delete?</p>
      <TeacherPicture pfp={data?.pfp} size="90px" extraClassName="" />
      <h2 className="text-[#303972] font-bold text-xl capitalize">
        {data?.firstName + " " + data?.lastName}
      </h2>
      <div className="flex justify-end mt-4 ">
        <button
          className="px-4 py-2 mr-2 bg-gray-500 text-white rounded-xl"
          onClick={() => {
            setShowModal(false);
            setType("");
          }}
        >
          Cancel
        </button>
        <div
          className={` cursor-pointer flex justify-center items-center px-4 py-2  bg-red  rounded-xl ${
            loading ? "gap-1" : "gap-2"
          }  `}
        >
          {loading && <Spinner size="sm" color="default" />}
          <button onClick={deleteRequest} className="text-white">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteWindowT;
