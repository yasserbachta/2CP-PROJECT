import { useState, useEffect } from "react";
import SelectComp from "../SelectComp";
import { Button } from "../ui";
import { teacherwhite } from "../../assets";
import { useType, useShowModal } from "../../hooks";
import axios from "../../api/axios";
import useAuthTokens from "../../context/AuthTokens";
import Select from "react-select";
import LLoading from "../../layout/Loading";
import { useParams } from "react-router-dom";

const TeachClass = ({}) => {
  const [loading, setLoading] = useState(false);
  const [subloading, setSubLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState(null);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "white" : "black",
      backgroundColor: state.isSelected ? "#4D44B5" : "inherit",
    }),
  };

  const { setType } = useType();
  const { setShowModal } = useShowModal();
  const { authTokens } = useAuthTokens();

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
      console.log("sending new teachers list :", response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    if (selected) {
      setSubLoading(true);
      try {
        const response = await axios.get(`api/Class/${param.classId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        });
        console.log("getting old teachers:", response);

        const newIdsList = [
          ...new Set([...response.data.teacher_ids, selected.id]),
        ];

        modifClass(newIdsList, response.data.modules_ids);

        setShowModal(false);
        setType("");
        setSubLoading(false);
      } catch (err) {
        setSubLoading(false);
        console.log(err);
      }
    } else {
      setError("Please select a teacher !");
    }
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/teachers", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        });
        // console.log(response.data);
        const filtered = response.data.filter(
          (teacher) => teacher.module === param.module
        );
        // console.log("filtered teachers:", filtered);
        // replace response.data with filtered
        const formattedOptions = response.data.map((teacher) => ({
          label: teacher.nom + " " + teacher.prénom,
          value: teacher.nom + " " + teacher.prénom,
          id: teacher.teacher_id,
        }));
        // console.log(formattedOptions);
        setOptions(formattedOptions.filter((teach) => teach.id !== 9));
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    fetchTeachers();
  }, []);

  if (loading) return <LLoading />;

  return (
    <div className="md:w-[50%] w-[90%] max-w-[600px] h-fit  bg-white rounded-xl gap-5 flex flex-col shadow-lg p-5 items-center">
      <Select
        className="basic-single w-full  "
        classNamePrefix="SearchTeacher"
        placeholder="Search Teacher ..."
        defaultValue={null}
        isDisabled={false}
        isLoading={false}
        isClearable={true}
        isRtl={false}
        isSearchable={true}
        name="lang"
        options={options}
        styles={customStyles}
        onChange={(selectedOption) => {
          console.log("Selected option:", selectedOption);
          setSelected(selectedOption);
        }}
      />
      {error && (
        <div className="text-red text-sm font-poppins mt-1">{error}</div>
      )}
      <div
        onClick={() => {
          handleSubmit();
        }}
      >
        <Button
          loading={subloading}
          data={{
            style:
              " cursor-pointer h-[55px] px-4 gap-3 flex justify-center sm:flex items-center font-poppins text-white font-[400] bg-primarypurp rounded-[40px]",
            string: `Ajoute l'enseignant `,
            icon: teacherwhite,
            styleIcon: `w-[20px] h-[20px]`,
          }}
        />
      </div>
    </div>
  );
};

export default TeachClass;
