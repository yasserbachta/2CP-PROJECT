import AddingElement from "../AddingElement";
import { SearchHead } from "../ui";
import Listheadmd from "./Listheadmd";
import Attachement from "./Attachement";
import { useParams } from "react-router-dom";
import { Header } from "../../layout";
import Overlay from "../Overlay";
import { useState } from "react";
import { useAtchh } from "../../hooks";
import { useEffect } from "react";
import axios from "../../api/axios";
import useAuthTokens from "../../context/AuthTokens";
import LLoading from "../../layout/Loading";
import useAuth from "../../context/AuthContext";

const ModulePage = () => {
  const { atchh } = useAtchh();
  const { authTokens } = useAuthTokens();
  const { Auth } = useAuth();

  const [newTitle, setNewTitle] = useState("");
  const [attchType, setAttchType] = useState(atchh);
  const [localLoading, setLocalLoading] = useState(false);
  const [CoursesConfig, setCoursesConfig] = useState([[], [], [], []]);

  const module = useParams().module;
  const classId = useParams().classId;
  const moduleId = useParams().moduleId;

  const types = ["cours", "devoir", "epreuves", "evaluation continue"];

  const Courses = CoursesConfig[0];
  const Devoir = CoursesConfig[1];
  const Epreuves = CoursesConfig[2];
  const EvaluationContinue = CoursesConfig[3];

  const convertToConfig = (data) => {
    console.log("data :", data);
    const groupedData = [[], [], [], []];

    data.forEach((item) => {
      console.log(item.type);
      groupedData[types.indexOf(item.type)].push(item);
    });

    console.log("grouped :", groupedData);

    return groupedData;
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLocalLoading(true);

        const response = await axios.get(
          `api/Class/${classId}/Modules/${moduleId}/Courses`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authTokens.access}`,
            },
          }
        );

        // console.log(response);
        // console.log(response.data);
        setCoursesConfig(convertToConfig(response.data));
        console.log("CoursesConfig :", CoursesConfig);
        setLocalLoading(false);
      } catch (err) {
        setLocalLoading(false);
        console.log(err);
      }
    };
    fetchCourses();
  }, [moduleId]);

  if (localLoading) return <LLoading />;

  return (
    <div className="flex flex-col gap-5 sm:gap-9 w-[90vw] xs:w-auto  gap-x-0 sm:gap-x-8 m-[15px] sm:m-[30px] ">
      <Header title={`${module}`} />
      {Auth.role === "admin" && (
        <SearchHead
          showSearch={false}
          showImport={false}
          showAdd={true}
          buttonNames={["Teacher", "Teacher"]}
        />
      )}
      <div className="flex flex-col gap-5 sm:gap-9 items-center">
        {Auth.role === "teacher" && (
          <AddingElement page={"classes"} onChange={(e) => setNewTitle(e)} />
        )}
        {/* COURSES LIST */}
        <div className="w-[95%] sm:w-[75%] rounded-xl">
          {/* header */}
          <Listheadmd attchType={attchType} setAttchType={setAttchType} />
          {/* The List */}
          <div className="bg-white px-8 py-5 flex flex-col gap-[30px] rounded-b-xl h-[90vh]  sm:h-[70vh] overflow-y-scroll ">
            {attchType == "Cours" &&
              Courses.map((course, index) => (
                <Attachement key={index} data={course} />
              ))}
            {attchType == "Devoir" &&
              Devoir.map((course, index) => (
                <Attachement key={index} data={course} />
              ))}
            {attchType == "Epreuves" &&
              Epreuves.map((course, index) => (
                <Attachement key={index} data={course} />
              ))}
            {attchType == "EvaluationContinue" &&
              EvaluationContinue.map((course, index) => (
                <Attachement key={index} data={course} />
              ))}
            <br />
          </div>
        </div>
      </div>
      <Overlay data={newTitle} />
    </div>
  );
};

export default ModulePage;

// Testing Data

const Courses = [
  { courseName: "Almost Heroes", courseDate: "2/19/2025", id: "1" },
  { courseName: "Trinity and Beyond", courseDate: "9/4/2024", id: "1" },
  {
    courseName: "Devil Times Five (a.k.a. Peopletoys)",
    courseDate: "7/18/2023",
    id: "1",
  },
  { courseName: "Bling: A Planet Rock", courseDate: "4/29/2023", id: "1" },
  {
    courseName: "Gross Anatomy (a.k.a. A Cut Above)",
    courseDate: "12/13/2024",
    id: "1",
  },
  { courseName: "Good Man in Africa, A", courseDate: "1/13/2024", id: "1" },
  { courseName: "Outlaw of Gor", courseDate: "4/23/2025", id: "1" },
  { courseName: "White Noise 2: The Light", courseDate: "7/22/2023", id: "1" },
  {
    courseName: "Guest from the Future (Gostya iz buduschego)",
    courseDate: "12/17/2024",
    id: "1",
  },
  { courseName: "Rapture-Palooza", courseDate: "7/31/2024", id: "1" },
  { courseName: "Ponterosa", courseDate: "12/13/2023", id: "1" },
  {
    courseName: "George Lopez: America's Mexican",
    courseDate: "3/18/2025",
    id: "1",
  },
  { courseName: "Bride Came C.O.D., The", courseDate: "11/17/2023", id: "1" },
  {
    courseName: "Nostalgia for the Light (Nostalgia de la luz)",
    courseDate: "12/21/2024",
    id: "1",
  },
  {
    courseName: "Water Lilies (Naissance des pieuvres)",
    courseDate: "7/6/2024",
    id: "1",
  },
  {
    courseName: "One Nite In Mongkok (Wong gok hak yau)",
    courseDate: "12/14/2023",
    id: "1",
  },
  { courseName: "Monsieur Verdoux", courseDate: "2/7/2025", id: "1" },
  { courseName: "Bears", courseDate: "8/28/2023", id: "1" },
  { courseName: "My Dear Secretary", courseDate: "3/24/2025", id: "1" },
  { courseName: "Body Snatchers", courseDate: "3/2/2025", id: "1" },
  { courseName: "Gnomeo & Juliet", courseDate: "8/7/2023", id: "1" },
  { courseName: "Grateful Dawg", courseDate: "5/5/2025", id: "1" },
  { courseName: "Love, Rosie", courseDate: "11/2/2023", id: "1" },
  {
    courseName: "Woman Next Door, The (Femme d'à côté, La)",
    courseDate: "5/8/2023",
    id: "1",
  },
  { courseName: "Joan of Arc", courseDate: "4/12/2024", id: "1" },
  { courseName: "Orchestra Wives", courseDate: "5/20/2024", id: "1" },
  {
    courseName: "Agony and the Ecstasy of Phil Spector, The",
    courseDate: "6/15/2024",
    id: "1",
  },
  { courseName: "Deewaar", courseDate: "7/23/2023", id: "1" },
  {
    courseName: "Red Cliff Part II (Chi Bi Xia: Jue Zhan Tian Xia)",
    courseDate: "1/17/2025",
    id: "1",
  },
  { courseName: "Cookers", courseDate: "10/11/2023", id: "1" },
];

const Devoir = [
  { courseName: "Monsieur Verdoux", courseDate: "2/7/2025", id: "1" },
  { courseName: "Bears", courseDate: "8/28/2023", id: "1" },
  { courseName: "My Dear Secretary", courseDate: "3/24/2025", id: "1" },
  { courseName: "Body Snatchers", courseDate: "3/2/2025", id: "1" },
];

const Epreuves = [];

const EvaluationContinue = [];
