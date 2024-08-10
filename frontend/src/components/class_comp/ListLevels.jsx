import ListClass from "./ListClass";
import { useParams } from "react-router-dom";
import { Header, SearchHead } from "../../layout";
import axios from "../../api/axios";
import Overlay from "../Overlay";
import LLoading from "../../layout/Loading";
import { useEffect, useState } from "react";
import useAuthTokens from "../../context/AuthTokens";
import useAuth from "../../context/AuthContext";
import refrechHandler from "../../context/refrechHandler";

function ListLevels() {
  const grade = useParams().grade.toLocaleUpperCase();

  const { authTokens } = useAuthTokens();
  const { refClassList } = refrechHandler();
  const { Auth } = useAuth();
  // console.log("Auth :", Auth);

  const [localLoading, setLocalLoading] = useState(false);
  const [levels, setLevels] = useState([]);

  function groupByNiveau(data) {
    const groupedData =
      grade.toLowerCase() === "cem"
        ? [[], [], [], []]
        : grade.toLowerCase() === "primaire"
        ? [[], [], [], [], []]
        : [[], [], []];

    data.forEach((item) => {
      const niveau = item.année;
      // console.log("niveau :", niveau);
      groupedData[niveau - 1].push(item);
    });

    return groupedData;
  }

  const convertLevels = (data) => {
    // console.log("data :", data);
    const gradee =
      grade.toLowerCase() === "cem"
        ? "m"
        : grade.toLowerCase() === "primaire"
        ? "p"
        : "s";
    const preFilteredLevels = data.filter(
      (level) => level.niveau.toLowerCase() === gradee
    );

    const filteredLevels = preFilteredLevels.filter((level) => level.année < 6);

    // console.log("filtered :", filteredLevels);

    const groupedByNiveau = groupByNiveau(filteredLevels);

    // console.log("grouped :", groupedByNiveau);

    return groupedByNiveau;
  };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLocalLoading(true);
        const response = await axios.get("api/Class", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        });
        // console.log(response);
        // console.log(response.data);
        setLocalLoading(false);
        const convertedLevels = convertLevels(response.data);
        setLevels(convertedLevels);
      } catch (err) {
        setLocalLoading(false);
        console.log(err);
      }
    };
    fetchClasses();
  }, [grade, refClassList]);

  if (localLoading) return <LLoading />;

  return (
    <div className="m-[15px] sm:m-[30px] flex flex-col gap-5 sm:gap-9">
      <Header title={"Classes"} />
      {Auth.role === "admin" && (
        <SearchHead
          showSearch={false}
          showImport={false}
          buttonNames={["", "Class"]}
        />
      )}
      <div className="pl-2 flex flex-col gap-8 transition ease-in-out delay-50">
        {levels.map(
          (lvl, indx) =>
            lvl.length > 0 && (
              <div className="flex flex-col gap-2" key={indx}>
                <h1 className="text-[#303972] text-[27px] font-bold mb-4">
                  {String(indx + 1) +
                    " " +
                    (indx === 0 ? "ère" : "éme") +
                    " " +
                    "année" +
                    " " +
                    (grade.toLowerCase() == "cem"
                      ? "moyenne"
                      : grade.toLowerCase())}
                </h1>
                <ListClass key={indx} claSs={lvl} />
              </div>
            )
        )}
      </div>
      <Overlay data={grade} />
      <div className="sm:hidden">
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}

export default ListLevels;
