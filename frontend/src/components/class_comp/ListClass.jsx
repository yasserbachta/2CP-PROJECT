import StudyClass from "./StudyClass";
import { useState } from "react";

function ListClass({ claSs }) {
  claSs = claSs || [];
  claSs = claSs.filter((classe) => classe !== null || classe !== undefined);

  return (
    <div className="flex flex-wrap w-auto gap-5  items-center  transition ease-in-out delay-50">
      {claSs.map((classObj) => (
        <StudyClass
          key={classObj.id}
          classId={classObj.id}
          grade={
            classObj.niveau.toUpperCase() === "S"
              ? "LYCEE"
              : classObj.niveau.toUpperCase() === "M"
              ? "CEM"
              : "PRIMAIRE"
          }
          level={String(classObj.année)}
          number={classObj.num_classe}
        />
      ))}
    </div>
  );
}

export default ListClass;
