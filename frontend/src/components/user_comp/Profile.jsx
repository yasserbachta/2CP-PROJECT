import {
  IconText,
  TeacherPicture,
  SmallButton,
  ClassBox,
  Overlay,
} from "../ui";
import { ClassW, Phone, Edit, Location, Email, Parent } from "../../assets";
import { useShowModal, useType } from "../../hooks";
import { useState } from "react";
import Loading from "../../layout/Loading";
import useLoadingP from "../../context/profileLoading";

const Profile = ({ userData }) => {
  const { loading, setLoading } = useLoadingP();
  const { showModal, setShowModal } = useShowModal();
  const { setType } = useType();

  const buttonSizes = "35px";

  // setLoading(false);

  if (loading) {
    console.log(loading);
    return <Loading />;
  }

  return (
    <div className="relative flex flex-col rounded-xl p-2 bg-white sm:p-[25px]  overflow-hidden">
      <div className="absolute top-0 left-0 h-[140px] w-full  bg-primarypurp "></div>

      <span
        onClick={() => {
          setType("UploadPfp");
          setShowModal(true);
        }}
      >
        <TeacherPicture
          pfp={userData.pfp}
          size="115px"
          extraClassName=" border-4 border-white ml-[15px] mt-[55px] relative z-10 transition-all"
          hoverEffect={true}
        />
      </span>

      <div className="flex justify-start gap-[30px] ml-[25px] sm:w-2/5  mb-4  ">
        <div className="flex flex-col justify-center">
          <h3 className="text-[#303972] font-bold text-xl capitalize">
            {userData.prénom + " " + userData.nom}
          </h3>

          {/* depends on the type of the user */}
          {userData.role === "teacher" && (
            <p className="font-poppins text-[#A098AE]">
              {userData.module + " Teacher"}
            </p>
          )}
          {userData.role === "student" && (
            <p className="font-poppins text-[#A098AE]">
              {userData.grade + " Student"}
            </p>
          )}
          {userData.role === "admin" && (
            <p className="font-poppins text-[#A098AE]">Admin</p>
          )}
        </div>
        <span
          onClick={() => {
            setShowModal(true);
            switch (userData.role) {
              case "teacher":
                setType("EditPT");
                break;
              case "student":
                setType("EditPS");
                break;
              case "admin":
                setType("EditPA");
                break;
              default:
                setType("");
            }
          }}
        >
          <SmallButton
            picture={Edit}
            altText="Edit"
            hoverText="Edit"
            color={"#FB7D5B"}
            size={"40px"}
          />
        </span>
      </div>

      <div className="flex flex-col items-start">
        <div className="flex flex-col m-1 ml-3 mb-3">
          {userData?.parent_name && (
            <IconText
              picture={Parent}
              color="#4D44B5"
              data={userData.parent_name}
              size={buttonSizes}
              extraClass="font-bold"
            />
          )}
          {userData?.location && (
            <IconText
              picture={Location}
              color="#4D44B5"
              data={userData.location}
              size={buttonSizes}
              extraClass="font-bold"
            />
          )}
          {userData.role !== "admin" && (
            <IconText
              picture={Phone}
              color="#F3F4FF"
              data={userData.phone_num ? userData.phone_num : "no phone number"}
              size={buttonSizes}
              extraClass="font-bold"
            />
          )}
          <IconText
            picture={Email}
            color="#FCC43E"
            data={userData.email}
            size={buttonSizes}
            extraClass="font-bold"
          />
        </div>

        {userData.role != "student" && (
          <div className="m-1 ml-4 flex flex-col gap-3">
            <h3 className=" text-[#303972] font-bold text-lg ">About :</h3>
            <p className="font-poppins text-[#303972] text-base min-h-[80px] max-w-[615px]">
              {userData.about}
            </p>
          </div>
        )}

        {userData.role === "teacher" && (
          <div className="m-2 ml-3">
            <IconText
              picture={ClassW}
              color="#4CBC9E"
              data={"Classes :"}
              size={buttonSizes}
              extraClass="font-bold"
            />
            <div className="flex flex-wrap ml-4 w-3/4 sm:w-[600px]">
              {userData.classes.map((name, indx) => {
                return (
                  <ClassBox
                    key={indx}
                    theclass={name}
                    color="#FB7D5B"
                    style="w-[85px] text-white text-center rounded-[14px] shadow-md text-[20px] font-[500] m-3 uppercase py-3 cursor-pointer"
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className="sm:hidden">
        <br />
        <br />
        <br />
      </div>
      {showModal && <Overlay data={userData} />}
    </div>
  );
};

export default Profile;
