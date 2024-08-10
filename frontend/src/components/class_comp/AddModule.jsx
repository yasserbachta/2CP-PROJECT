import { useState } from "react";
import { Button } from "../ui";
import { Plus } from "../../assets";
import { useShowModal, useType } from "../../hooks";
import { useParams } from "react-router-dom";
import SelectComp from "../SelectComp";
import useAuth from "../../context/AuthContext";
import useAuthTokens from "../../context/AuthTokens";
import axios from "../../api/axios";
import refrechHandler from "../../context/refrechHandler";

const AddModule = () => {
  const { setShowModal } = useShowModal();
  const { setType } = useType();
  const { authTokens } = useAuthTokens();
  const { refModulesList, setModulesList } = refrechHandler();

  const options = [
    "Math",
    "Arab",
    "Anglais",
    "Physique",
    "Science",
    "Histoire & Geo",
    "Français",
  ];
  const optionsIds = [1, 2, 3, 4, 6, 7, 8];

  const [loading, setLoading] = useState(false);
  const [module, setModule] = useState("Math");

  const handleInputChange = (value) => {
    setModule(value);
  };

  const param = useParams();

  const modifClass = async (newIdslist, moduleIds) => {
    try {
      const response = await axios.put(
        `api/Class/${param.classId}/`,
        {
          niveau: param.class[1].toUpperCase(),
          année: param.class[0],
          num_classe: param.class[2],
          teacher: newIdslist,
          AcademicYear: 1,
          Modules: moduleIds,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );
      console.log("sending new modules list :", response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`api/Class/${param.classId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      console.log("getting old modules:", response);

      const newIdsList = [
        ...new Set([
          ...response.data.modules_ids,
          optionsIds[options.indexOf(module)],
        ]),
      ];
      modifClass(response.data.teacher_ids, newIdsList);
      setLoading(false);
      setShowModal(false);
      setType("");
      setModulesList(!refModulesList);
      window.location.reload();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="md:w-[50%] w-[90%] max-w-[600px] h-fit  bg-white rounded-xl gap-5 flex flex-col shadow-lg p-5 items-center">
      <SelectComp
        label={"Nom de la matiére *"}
        options={options}
        name={"grade"}
        style={
          "mt-2 w-[260px] sm:w-[400px] overflow-y-scroll px-[25px] placeholder:text-textgray text-black w-full h-12 p-0 border shadow-sm border-borderColor text-[15px] sm:text-[18px] font-kumbhfont font-medium rounded-lg mb-4 outline-none"
        }
        onChange={(value) => handleInputChange(value)}
      />

      <div className="flex justify-end w-[260px] sm:w-[400px]">
        <div
          onClick={() => {
            handleSubmit();
          }}
        >
          <Button
            loading={loading}
            data={{
              style:
                " cursor-pointer h-[55px] w-[140px] gap-3 flex justify-center sm:flex items-center font-poppins text-white font-[400] bg-primarypurp rounded-[40px]",
              string: `Matiére`,
              icon: Plus,
              styleIcon: `w-[20px] h-[20px]`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AddModule;
