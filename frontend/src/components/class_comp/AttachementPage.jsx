import { Header } from "../../layout";
import Attachement from "./Attachement";
import { Send, dots } from "../../assets";
import { useState, useEffect } from "react";
import { Button, SmallButton, TeacherPicture } from "../ui";
import useAuth from "../../context/AuthContext";
import useAuthTokens from "../../context/AuthTokens";
import { Trash, Edit } from "../../assets";
import { excel, pdf, file } from "../../assets";
import { useParams } from "react-router-dom";
import { Spinner } from "@nextui-org/react";
import axios from "../../api/axios";
import LLoading from "../../layout/Loading";
import refrechHandler from "../../context/refrechHandler";

const AttachementPage = () => {
  const { Auth } = useAuth();
  const { authTokens } = useAuthTokens();
  const { refCorsesList } = refrechHandler();

  const [show, setShow] = useState(false);
  const [allLoading, setallLoading] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [course, setCourse] = useState([]);

  function getFileType(filename) {
    const parts = filename.split(".");
    const extension = parts[parts.length - 1];
    return extension;
  }

  const allParams = useParams();

  const handleSendingComment = async () => {
    const comment = document.getElementById("addEventInput").value;
    if (comment) {
      console.log("sending the comment:", comment);
      try {
        setCommentsLoading(true);

        const response = await axios.post(
          `api/Courses/${allParams.courseId}/Comments/`,
          {
            comment: comment,
            student: Auth.student_id,
            created: new Date().toISOString(),
            course: allParams.courseId,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authTokens.access}`,
            },
          }
        );

        // console.log(response);
        // console.log(response.data);
        setComments([...comments, response.data]); // Update the comments state with the new comment
        setCommentsLoading(false);
      } catch (err) {
        setCommentsLoading(false);
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setallLoading(true);

        const response = await axios.get(`api/Courses/${allParams.courseId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        });

        // console.log(response);
        // console.log(response.data);
        setCourse(response.data);
        setallLoading(false);
        fetchComments();
      } catch (err) {
        setallLoading(false);
        console.log(err);
      }
    };

    const fetchComments = async () => {
      try {
        setCommentsLoading(true);

        const response = await axios.get(
          `api/Courses/${allParams.courseId}/Comments`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authTokens.access}`,
            },
          }
        );

        // console.log(response);
        // console.log(response.data);
        setComments(response.data);
        setCommentsLoading(false);
        //
      } catch (err) {
        setCommentsLoading(false);
        console.log(err);
      }
    };

    fetchCourse();
  }, [refCorsesList]);

  if (allLoading) return <LLoading />;

  return (
    <div className="font-poppins m-[15px] h-[105vh] sm:m-[30px] flex flex-col gap-5 sm:gap-9">
      <Header title={"Classes"} />
      <div className="w-full text-[30px] text-primarypurp font-[700]">
        {allParams.class +
          " >> " +
          allParams.module +
          " >> " +
          allParams.course}
      </div>
      <div
        className={`relative  flex flex-col rounded-xl bg-white  pt-5 gap-3 h-screen overflow-y-scroll px-4 sm:px-14 py-6`}
      >
        <div className="p-5 flex items-center justify-between select-none border-b-[1.5px]">
          <Attachement link={false} hoverEffect={false} data={course} />
          {Auth.role !== "student" && (
            <div
              onClick={() => setShow(!show)}
              className={` w-[25px] h-[25px] flex justify-center items-center transition ease-in-out  cursor-pointer ${
                show ? "translate-x-4" : ""
              }`}
            >
              <img src={dots} alt="" />
            </div>
          )}
          <div
            className={`absolute ${
              show ? " block" : " hidden"
            } flex flex-row-reverse transition ease-out gap-3 right-[100px]`}
          >
            <SmallButton
              picture={Trash}
              altText="Delete"
              hoverText="Delete"
              color={"#FF4550"}
              size={"35px"}
            />
            {/* <SmallButton
              picture={Edit}
              altText="Edit"
              hoverText="Edit"
              color={"#FB7D5B"}
              size={"35px"}
            /> */}
          </div>
        </div>
        <a href={course.file} target="_blank" rel="noopener noreferrer">
          <div className="p-5 flex justify-start items-center w-full border-b-[1.5px] ">
            <div className="w-[90%] max-w-[500px]  h-fit rounded-md border border-[#DEDEDE] flex mb-[10px]">
              <img
                className="w-[120px] h-[90px] rounded-l-md p-3 "
                src={
                  course.file
                    ? getFileType(course.file) === "pdf"
                      ? pdf
                      : getFileType(course.file) === "xlsx"
                      ? excel
                      : file
                    : file
                }
                alt=""
              />
              <div className="p-4 flex flex-col justify-center items-start">
                <p className=" font-[600] text-[17px] text-primarypurp">
                  {course.title}
                </p>
                <p className="font-[500] text-[#A7A7A7]">{course.type}</p>
              </div>
            </div>
            <br />
          </div>
        </a>
        <div className="flex gap-5 flex-col ">
          <p className="font-[600] text-[#A7A7A7] text-[18px] sm:text-[23px] opacity-80">
            Comments Added to the Course
          </p>

          {Auth.role === "student" && (
            <div
              className="relative flex px-4 justify-start 
        items-center gap-3 py-4 sm:py-2 max-w-[550px] w-[95%] h-[65px] sm:w-[75%] rounded-full bg-[#F3F4FF] "
            >
              <div>
                <TeacherPicture krahti={false} pfp={Auth.pfp} size="48px" />
              </div>
              <div className="flex-1">
                <input
                  placeholder="Add Comment"
                  type="text"
                  id="addEventInput"
                  className=" text-center sm:text-left font-poppins font-[500] bg-transparent outline-none flex-1 w-full"
                />
              </div>
              <div className=" cursor-pointer">
                {!commentsLoading && (
                  <img
                    className="w-[25px] h-[25px]"
                    src={Send}
                    alt=""
                    onClick={() => {
                      handleSendingComment();
                      window.location.reload();
                      document.getElementById("addEventInput").value = "";
                    }}
                  />
                )}
                {commentsLoading && <Spinner size="sm" />}
              </div>
            </div>
          )}
        </div>
        {!commentsLoading &&
          comments.map((comment, index) => (
            <div key={index}>
              <Comment data={comment} />
            </div>
          ))}
        {commentsLoading && <LLoading />}
      </div>
      <div className="sm:hidden">
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default AttachementPage;

function Comment({ data }) {
  return (
    <div
      className="flex px-6 justify-start  font-poppins
      items-center gap-3 max-w-[550px] w-[95%] h-[70px]
      sm:w-[75%] rounded-full bg-white relative border-[1px]
      border-[#DEDEDE]"
    >
      <div className="flex gap-2">
        <div className="h-[45px] w-[45px] bg-pfpclr rounded-full"></div>
        <div className="flex flex-col">
          <p className="text-[14px] text-gray-600">
            {data.student.nom + " " + data.student.prénom}
          </p>
          <p className="font-[500] text-[#263238]">{data.comment}</p>
        </div>
      </div>
    </div>
  );
}
