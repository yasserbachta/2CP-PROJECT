import StudyClass from "./StudyClass";
import { Header, SearchHead } from "../../layout";
import axios from "../../api/axios";
import Overlay from "../Overlay";
import LLoading from "../../layout/Loading";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuthTokens from "../../context/AuthTokens";
import useAuth from "../../context/AuthContext";

//when a teacher have only one class he gets redirected to it directly

function ListClassTeacher() {
  const { authTokens } = useAuthTokens();
  const { Auth } = useAuth();

  const [localLoading, setLocalLoading] = useState(false);
  const [teacherClasses, setTeacherClasses] = useState(Auth.classes || []); //Auth.classes
  const [teacherClassesIds, setTeacherClassesIds] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLocalLoading(true);
        const response = await axios.get(`api/teachers2/${Auth.teacher_id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        });

        setTeacherClassesIds(response.data.classes);

        setLocalLoading(false);
      } catch (err) {
        setLocalLoading(false);
        console.log(err);
      }
    };
    fetchClasses();
  }, [authTokens, Auth]);

  const grade =
    teacherClasses[0][1] === "M"
      ? "CEM"
      : teacherClasses[0][1] === "S"
      ? "LYCEE"
      : "PRIMAIRE";

  if (teacherClasses.length === 1 && teacherClassesIds.length === 1) {
    return (
      <Navigate
        to={`/classes/${grade}/${teacherClasses[0]}/${teacherClassesIds[0]}`}
      />
    );
  }

  if (localLoading) return <LLoading />;

  //yasser ki ta3dlha dir hsabk l classes am mch ha ykounou bzaf
  return (
    <div className="m-[15px] sm:m-[30px] flex flex-col gap-5 sm:gap-9">
      <Header title={"My Classes"} />
      <div className="pl-2 flex flex-col gap-8 transition ease-in-out delay-50">
        <div className="flex flex-wrap w-auto gap-5  items-center  transition ease-in-out delay-50">
          {teacherClasses.map((oneClass, indx) => (
            <StudyClass
              key={indx}
              classId={teacherClassesIds[indx]}
              grade={
                oneClass[1] === "M"
                  ? "CEM"
                  : oneClass[1] === "S"
                  ? "LYCEE"
                  : "PRIMAIRE"
              }
              level={String(oneClass[0])}
              number={oneClass[2]}
            />
          ))}
        </div>
      </div>
      <div className="sm:hidden">
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}

export default ListClassTeacher;
