import React from "react";
import { Nostudent, Listhead, Studentitem } from "./";
import { useSort, useSearch, useShow, useShowModal } from "../../hooks";
import { Overlay } from "../ui";
import refrechHandler from "../../context/refrechHandler";
import { useEffect, useState } from "react";
import useAuthTokens from "../../context/AuthTokens";
import axios from "../../api/axios";
import LLoading from "../../layout/Loading";
import useLoadingS from "../../context/studentsLoading";

const Studentlist = () => {
  const { showModal } = useShowModal();
  const { show } = useShow();
  const { search } = useSearch();
  const { sorted } = useSort();
  const { authTokens } = useAuthTokens();
  const [Students, setStudents] = useState([]);
  const { loading, setLoading } = useLoadingS();
  const { refStudentList } = refrechHandler();

  useEffect(() => {
    //the function that request the data :
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/students", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        });

        // console.log(response);
        const data = response.data;
        // console.log(data);

        // Renaming the properties
        const renamedData = data.map((item) => {
          const {
            prénom: firstName,
            nom: lastName,
            phone_num: contact,
            student_id: id,
            parent_name: parentName,
            ...rest
          } = item;

          return {
            firstName,
            lastName,
            contact,
            id,
            parentName,
            ...rest,
          };
        });

        console.log(renamedData);
        // // Setting the state
        setStudents(renamedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching students:", error);
        setLoading(false);
      }
    };

    fetchStudents();
  }, [refStudentList]);

  const sortedStudents = [...Students].sort((a, b) => {
    const nameA = a.lastName.toUpperCase(); // ignore upper and lowercase
    const nameB = b.lastName.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  if (loading) return <LLoading />;
  console.log(Students);

  return (
    <div
      className={`relative flex flex-col rounded-xl bg-white  overflow-hidden pt-5 select-none gap-5 h-screen  ${
        Students.length == 0
          ? "justify-center items-center h-screen"
          : "justify-start items-start"
      }`}
    >
      {Students.length == 0 ? (
        <Nostudent />
      ) : (
        <div className="w-full ">
          <Listhead data={Students} />
          <hr />
          <div className="h-[75vh] overflow-y-scroll ">
            {sorted
              ? sortedStudents
                  .filter((student) => {
                    return search.toLowerCase() == ""
                      ? student
                      : student.lastName
                          .toLowerCase()
                          .includes(search.toLowerCase().replace(/\s/g, ""));
                  })
                  .map((student) => {
                    console.log(student);
                    return <Studentitem key={student.id} data={student} />;
                  })
              : Students.filter((student) => {
                  return search.toLowerCase() == ""
                    ? student
                    : student.lastName
                        .toLowerCase()
                        .includes(search.toLowerCase().replace(/\s/g, ""));
                }).map((student) => {
                  return <Studentitem key={student.id} data={student} />;
                })}
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="sm:hidden">
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <Overlay
          data={
            Students[
              Students.findIndex((item) => {
                return item.id == show;
              })
            ]
          }
        />
      )}
    </div>
  );
};

export default Studentlist;
