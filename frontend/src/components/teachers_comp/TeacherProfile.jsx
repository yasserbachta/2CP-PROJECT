import {
  IconText,
  TeacherPicture,
  SmallButton,
  ClassBox,
  Overlay,
} from "../ui";
import { ClassW, Phone, Edit, Delete, Location, Email } from "../../assets";
import { useShowModal, useType } from "../../hooks";
import { Link, useParams } from "react-router-dom";
import { Header, SearchHead } from "../../layout";
import { useState, useEffect } from "react";
import Loading from "../../layout/Loading";
import axios from "../../api/axios";
import useAuthTokens from "../../context/AuthTokens";
import module from "../class_comp/Module";

function TeacherProfile() {
  const { showModal, setShowModal } = useShowModal();
  const { setType } = useType();
  const { authTokens } = useAuthTokens();
  const buttonSizes = "35px";
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  // request
  const fetchTeacher = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/teachers/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      // console.log(response);
      if (response.status === 200) {
        // console.log(response.data);
        const data = {
          gender: response.data?.gender || "",
          firstName: response.data?.prénom || "No firstname",
          lastName: response.data?.nom || "No lastname",
          phone: response.data?.phone_num || "No phone number",
          email: response.data?.email || "No email",
          location: response.data?.location || "No location",
          info: response.data?.about || "No info",
          module: response.data?.module || "",
          classes: response.data?.classes || [],
          pfp: response.data?.pfp || "",
        };

        console.log(response.data);
        setData(data);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeacher();
  }, []);

  if (loading) {
    return (
      <div className="m-[15px] sm:m-[30px] flex flex-col gap-5 sm:gap-9">
        <Header title={"Teachers"} />
        <SearchHead showSearch={false} />
        <Loading />
      </div>
    );
  }

  return (
    <div className="m-[15px] sm:m-[30px] flex flex-col gap-5 sm:gap-9">
      <Header title={"Teachers"} />
      <SearchHead showSearch={false} />
      <div className="relative flex flex-col rounded-xl p-2 bg-white sm:p-[25px]  overflow-hidden">
        {/* this div is for the cover  */}
        <div className="absolute top-0 left-0 h-[140px] w-full  bg-primarypurp "></div>
        {/* the profile picture */}
        <TeacherPicture
          pfp={data.pfp}
          size="115px"
          extraClassName=" border-4 border-white ml-[15px] mt-[55px] relative z-10"
        />

        {/* this div is for the name and the buttons */}
        <div className="flex justify-evenly sm:w-2/5  m-2 mb-4 max-w-[275px]">
          <div className="flex flex-col justify-center">
            <h3 className="text-[#303972] font-bold text-xl capitalize">
              {data.firstName + " " + data.lastName}
            </h3>
            <p className="font-poppins text-[#A098AE]">{data.module} Teacher</p>
          </div>
          <Link to={`/teachers/profile/${id}/edit`}>
            <SmallButton
              picture={Edit}
              altText="Edit"
              hoverText="Edit"
              color={"#FB7D5B"}
              size={"40px"}
            />
          </Link>
          <span
            onClick={() => {
              setShowModal(true);
              setType("DeleteT");
            }}
          >
            <SmallButton
              picture={Delete}
              altText="Delete"
              hoverText="Delete"
              color={"#FF4550"}
              size={"40px"}
            />
          </span>
        </div>
        {/* this div is for details  */}
        <div className="flex flex-col items-start">
          <div className="flex flex-col m-1 ml-3 mb-3">
            <IconText
              picture={Location}
              altText="Location"
              hoverText="location"
              color="#4D44B5"
              data={data.location}
              size={buttonSizes}
              extraClass="font-bold"
            />
            <IconText
              picture={Phone}
              altText="Phone"
              hoverText="phone"
              color="#F3F4FF"
              data={data.phone}
              size={buttonSizes}
              extraClass="font-bold"
            />
            <IconText
              picture={Email}
              altText="Email"
              hoverText="email"
              color="#FCC43E"
              data={data.email}
              size={buttonSizes}
              extraClass="font-bold"
            />
          </div>
          {/* this div is for info  */}
          <div className="m-1 ml-4 flex flex-col gap-3">
            <h3 className=" text-[#303972] font-bold text-lg ">About :</h3>
            <p className="font-poppins text-[#303972] text-base min-h-[80px] max-w-[615px]">
              {data.info}
            </p>
          </div>
          {/* this div is for teacher classes */}
          <div className="m-2 ml-3">
            <IconText
              picture={ClassW}
              altText="Class"
              hoverText="class"
              color="#4CBC9E"
              data={"Classes :"}
              size={buttonSizes}
              extraClass="font-bold"
            />
            <div className="flex flex-wrap ml-4  sm:w-[600px]">
              {data.classes.map((name, indx) => {
                return (
                  <ClassBox
                    key={indx}
                    theclass={name}
                    color={
                      name.includes("M")
                        ? "#FB7D5B"
                        : name.includes("P")
                        ? "#FCC43E"
                        : "#4D44B5"
                    }
                    style="w-[85px] text-white text-center rounded-[14px] shadow-md text-[20px] font-[500] m-3 uppercase py-3 cursor-pointer"
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="sm:hidden">
          <br />
          <br />
          <br />
        </div>
        {showModal && <Overlay data={data} />}
      </div>
      <div className="sm:hidden">
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}

export default TeacherProfile;
