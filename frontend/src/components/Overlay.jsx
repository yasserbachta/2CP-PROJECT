import { DeletWindowS, StudentForm, AbsentWindow } from "./students_comp";
import { useType, useShowModal } from "../hooks";
import { DeleteWindowT } from "./teachers_comp";
import { useEffect, useState } from "react";
import { AddEventForm, DeleteEvent, ModifyEvent, Votes } from "./events_comp";
import {
  EditProfileT,
  EditProfileS,
  EditProfileA,
  UploadPfp,
} from "./user_comp";
import { AddClass, AddModule, TeachClass, AddAttach } from "./class_comp";
import AddCsv from "../layout/Addcsv";
import ChangePassword from "./user_comp/ChangePassword";
const Overlay = ({ data, classes = {} }) => {
  const [animate, setAnimate] = useState(false);

  const { setShowModal } = useShowModal();
  const { type, setType } = useType();

  useEffect(() => {
    setAnimate(true);
    return () => {
      setAnimate(false);
    };
  }, [type]);

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setShowModal(false);
          setType("");
        }
      }}
      className={` ${animate ? "opacity-100" : "opacity-0"}   ${
        type == ""
          ? "bg-transparent scale-[0.98]"
          : "fixed top-0 left-0 w-full h-[100%] flex items-center justify-center z-20 transition-all ease-in-out duration-300 bg-black bg-opacity-10 backdrop-filter backdrop-blur-[2px] "
      }`}
    >
      {type === "DeleteS" && <DeletWindowS data={data} />}
      {type === "AddS" && <StudentForm classes={classes} />}
      {type === "Edit" && <StudentForm datatemp={data} classes={classes} />}
      {type === "DeleteT" && <DeleteWindowT data={data} />}
      {type === "AddEvent" && <AddEventForm title={data} />}
      {type === "EditPT" && <EditProfileT data={data} />}
      {type === "EditPS" && <EditProfileS data={data} />}
      {type === "EditPA" && <EditProfileA data={data} />}
      {type === "EditEvent" && <ModifyEvent oldData={data} />}
      {type === "DeleteEvent" && <DeleteEvent data={data} />}
      {type === "Votes" && <Votes data={data} />}
      {type === "Absence" && <AbsentWindow data={data} />}
      {type === "AddClass" && <AddClass grade={data} />}
      {type === "AddModule" && <AddModule />}
      {type === "TeachClass" && <TeachClass module={data} />}
      {type === "UploadPfp" && <UploadPfp data={data} />}
      {type === "AddCSV" && <AddCsv />}
      {type === "changePassword" && <ChangePassword />}
      {/* <TeachClass module={data} /> */}
      {type === "AddAttachement" && <AddAttach titlep={data} />}
    </div>
  );
};

export default Overlay;
