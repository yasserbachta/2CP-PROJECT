import React from "react";
import SearchBar from "./SearchBar";
import { Button } from "../components/ui";
import { Plus, teacherwhite } from "../assets";
import { Link, useParams } from "react-router-dom";
import { useType, useShowModal } from "../hooks";
import useCsvUrl from "../hooks/csvUrl";

const SearchHead = ({
  showSearch = true,
  showImport = true,
  showAdd = true,
  buttonNames = ["Import CSV", "Add"],
}) => {
  const { setType, type } = useType();
  const { setShowModal, ShowModal } = useShowModal();
  const { setCsvUrl } = useCsvUrl();
  return (
    <div className="flex justify-between items-center w-full gap-6">
      {showSearch ? <SearchBar /> : <div className="flex-1"></div>}
      <div className="flex gap-4">
        <div>
          {showImport && (
            <span
              onClick={() => {
                setShowModal(true);
                setType("AddCSV");
                setCsvUrl(
                  `${
                    window.location.pathname.split("/")[1] === "students"
                      ? "/api/students/add/csv/"
                      : "/api/teachers/add/csv/"
                  }`
                );
              }}
            >
              <Button
                data={{
                  style: ` cursor-pointer h-[55px] w-[170px] gap-3 flex justify-center ${
                    buttonNames[0] == "Teacher" ? "" : "hidden"
                  } sm:flex items-center font-poppins text-white font-[400] bg-primarypurp rounded-[40px]`,
                  string: `${buttonNames[0]}`,
                  icon: Plus,
                  styleIcon: `w-[20px] h-[20px]`,
                }}
              />
            </span>
          )}
        </div>
        <div
          onClick={() => {
            setShowModal(true);
            setType(
              `${
                window.location.pathname.split("/")[1] === "students"
                  ? "AddS"
                  : window.location.pathname.split("/")[1] === "classes"
                  ? window.location.pathname.split("/").length === 3
                    ? "AddClass"
                    : window.location.pathname.split("/").length === 5
                    ? "AddModule"
                    : "TeachClass"
                  : ""
              }`
            );
          }}
        >
          {showAdd &&
            (window.location.pathname.split("/")[1] == "teachers" ? (
              <Link to={"/teachers/add"}>
                <Button
                  data={{
                    style:
                      " cursor-pointer h-[50px] sm:h-[55px] w-[100px] sm:w-[150px] gap-3 flex justify-center items-center font-poppins text-white font-[400] bg-primarypurp rounded-[40px]",
                    string: `${buttonNames[1]}`,
                    icon: Plus,
                    styleIcon: `w-[17px] h-[17px] rounded-[40px]`,
                  }}
                />
              </Link>
            ) : (
              <div
                onClick={() => {
                  if (buttonNames[1] == "Teacher") {
                    setType("TeachClass");
                    setShowModal(true);
                    console.log(type);
                  }
                }}
              >
                <Button
                  data={{
                    style:
                      " cursor-pointer h-[50px] sm:h-[55px] w-[120px] sm:w-[150px] gap-3 flex justify-center items-center font-poppins text-white font-[400] bg-primarypurp rounded-[40px]",
                    string: `${buttonNames[1]}`,
                    icon: buttonNames[1] === "Teacher" ? teacherwhite : Plus,
                    styleIcon: `w-[20px] h-[20px]`,
                  }}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchHead;
