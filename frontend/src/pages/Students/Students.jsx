import React from "react";
import { SearchHead, Header } from "../../layout";
import { Studentlist } from "../../components/students_comp";
import { Sidebar, Bottombar } from "../../layout";
import { useParams } from "react-router-dom";

const Students = () => {
  return (
    <div className="m-[15px] h-[105vh] sm:m-[30px] flex flex-col gap-5 sm:gap-9">
      <Header title={"Students"} />
      <SearchHead />
      <Studentlist />
    </div>
  );
};

export default Students;
