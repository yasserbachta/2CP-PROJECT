import { useEffect, useState } from "react";
import { Button, LabeledInput } from "../ui";
import { Plus } from "../../assets";
import { useShowModal, useType } from "../../hooks";
import SelectComp from "../SelectComp";
import axios from "../../api/axios";
import useAuthTokens from "../../context/AuthTokens";
import refrechHandler from "../../context/refrechHandler";
import useExistClasses from "../../hooks/existClasses";

const AddClass = ({ grade }) => {
  const { setShowModal } = useShowModal();
  const { setType } = useType();
  const { authTokens } = useAuthTokens();
  const { refClassList, setRefClassList } = refrechHandler();
  const { existClasses } = useExistClasses();

  const [niveau, setNiveau] = useState("1");
  const [classNumber, setNumber] = useState(0);
  const [valid, setValid] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const NiveauList =
    grade == "LYCEE"
      ? ["1AS", "2AS", "3AS"]
      : grade == "CEM"
      ? ["1AM", "2AM", "3AM", "4AM"]
      : ["1AP", "2AP", "3AP", "4AP", "5AP"];

  const handleNiveauChange = (val) => {
    setNiveau(val);
  };

  const handleNumberChange = (val) => {
    setNumber(val);
  };

  const handleSubmission = async () => {
    if (valid) {
      setLoading(true);
      try {
        //send request to backend
        const response = await axios.post(
          "api/Class/",
          {
            niveau:
              grade.toLowerCase() === "lycee"
                ? "S"
                : grade.toLowerCase() === "cem"
                ? "M"
                : "P",
            année: niveau[0],
            num_classe: classNumber,
            teacher: [9],
            AcademicYear: 1,
            Modules: [5],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authTokens.access}`,
            },
          }
        );
        setLoading(false);
        setShowModal(false);
        setType("");
        setRefClassList(!refClassList);
        console.log(response);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    } else {
      setError("Please fill all the fields !");
    }
  };

  useEffect(() => {
    if (
      niveau !== "" &&
      classNumber !== "" &&
      classNumber > 0 &&
      !ExistClasses.includes(classNumber)
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [niveau, classNumber]);

  return (
    <div className="md:w-[50%] w-[90%] max-w-[600px] h-fit  bg-white rounded-xl gap-5 flex flex-col shadow-lg p-5 items-center">
      <SelectComp
        label="Niveau"
        options={NiveauList}
        name={""}
        style={
          "mt-2 w-[260px] sm:w-[400px] overflow-y-scroll px-[25px] placeholder:text-textgray text-black w-full h-12 p-0 border shadow-sm border-borderColor text-[15px] sm:text-[18px] font-kumbhfont font-medium rounded-lg mb-4 outline-none"
        }
        onChange={handleNiveauChange}
      />
      <LabeledInput
        data={{ name: "Numero", label: "Numero *" }}
        type="Number"
        customStyling={
          "mt-2 w-[260px] sm:w-[400px] overflow-y-scroll px-[25px] placeholder:text-textgray text-black w-full h-12 p-0 border shadow-sm border-borderColor text-[15px] sm:text-[18px] font-kumbhfont font-medium rounded-lg mb-4 outline-none"
        }
        onChange={handleNumberChange}
      />
      {error && <p className=" text-red"> {error} </p>}
      <div className="flex justify-end w-[260px] sm:w-[400px]">
        <div
          onClick={() => {
            handleSubmission();
          }}
        >
          <Button
            loading={loading}
            data={{
              style:
                " cursor-pointer h-[55px] w-[170px] gap-3 flex justify-center sm:flex items-center font-poppins text-white font-[400] bg-primarypurp rounded-[40px]",
              string: `New Class`,
              icon: loading ? "" : Plus,
              styleIcon: `w-[20px] h-[20px]`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AddClass;
