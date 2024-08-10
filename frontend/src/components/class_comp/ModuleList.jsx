import React, { useEffect, useState } from "react";
import LLoading from "../../layout/Loading";
import axios from "../../api/axios";
import Module from "./Module";
import { useParams } from "react-router-dom";
import { Overlay, SearchHead } from "../ui";
import { Header } from "../../layout";
import useAuthTokens from "../../context/AuthTokens";
import refrechHandler from "../../context/refrechHandler";
import useAuth from "../../context/AuthContext";

const ModuleList = () => {
  const [localLoading, setLocalLoading] = useState(false);
  const [Modules, setModules] = useState([]); //uncomment when the dataBase is ready

  const { authTokens } = useAuthTokens();
  const { refModulesList } = refrechHandler();
  const { Auth } = useAuth();

  const classId = useParams().classId;

  useEffect(() => {
    const fetchModules = async () => {
      try {
        setLocalLoading(true);

        const response = await axios.get(`api/Class/${classId}/Modules/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        });

        console.log(response);
        console.log(response.data);
        const filteredModules = response.data.filter(
          (module) => module.module !== "hidden"
        );
        setModules(filteredModules);
        setLocalLoading(false);
      } catch (err) {
        setLocalLoading(false);
        console.log(err);
      }
    };
    fetchModules();
  }, [classId, refModulesList]);

  if (localLoading) return <LLoading />;

  return (
    <div className="flex flex-col gap-5 sm:gap-9 m-[15px] sm:m-[30px]">
      <Header title="Classes" />
      {Auth.role === "admin" && (
        <SearchHead showSearch={false} showImport={false} />
      )}
      <div className="p-[15px] flex gap-4 flex-wrap justify-center sm:justify-start">
        {Modules.map((module) => (
          <Module
            key={module.module}
            Module={module.module}
            moduleId={module.id}
          />
        ))}
      </div>
      <br></br>
      <Overlay data={{}} />
    </div>
  );
};

export default ModuleList;
