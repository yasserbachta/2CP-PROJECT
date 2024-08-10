import { Header } from "../../layout";
import { GradesList, ListLevels , StudyClass , ModuleList , ModulePage } from "../../components/class_comp";
import {
  levelsLyceeData,
  levelsCemData,
  levelsPremData,
} from "../../constants"; //data will be from the backend
import React from "react";

const Classes = () => {
  return (
    <div className="m-[15px] sm:m-[30px] flex flex-col gap-9 min-h-screen">
      <Header title={"Classes"} />
      <GradesList />
      {/* <ListLevels grade={"LYCEE"} levels={levelsLyceeData} /> */}
      {/* <ListLevels grade={"PREM"} levels={levelsPremData} /> */}
      {/* <ListLevels grade={"CEM"} levels={levelsCemData} /> */}
      {/* <ModuleList /> */}
      {/* <ModulePage /> */}
      <div className="sm:hidden">
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default Classes;
