import { LabeledInput, Button } from "../ui/";
import { useState, useEffect, useCallback, memo } from "react";
import { emptyStudent, compareObjects } from "../../constants";
import { useType, useShowModal } from "../../hooks";
import SelectComp from "../SelectComp";
import axios from "../../api/axios";
import useAuthTokens from "../../context/AuthTokens";
import refrechHandler from "../../context/refrechHandler";
import useLoadingS from "../../context/studentsLoading";

const StudentForm = ({ datatemp = emptyStudent }) => {
  // console.log(datatemp);
  const { type, setType } = useType();
  const { setShowModal } = useShowModal();
  const { refStudentList, setRefStudentList } = refrechHandler();
  const { setLoading } = useLoadingS();
  const { authTokens } = useAuthTokens();

  const [loading, setLocalLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [data, setData] = useState(datatemp);
  const [formData, setFormData] = useState(data);
  const [grade, setGrade] = useState("P");
  const [ableToSubmit, setAbleToSubmit] = useState(false);
  const [anError, setAnError] = useState(false);
  const [options, setOptions] = useState([]);
  const [optionsIds, setOptionsIds] = useState([]);

  const addingStudent = emptyStudent === data;

  const addConvertDataFormat = (data) => {
    return {
      id: data.id,
      prénom: data.firstName,
      nom: data.lastName,
      email: data.email,
      phone_num: data.contact,
      parent_name: data.parentName,
      grade: data.grade,
      gender: data.gender,
      classe: optionsIds[options.indexOf(data.class) - 1],
      pfp: "",
    };
  };

  const handleSubmit = async () => {
    if (ableToSubmit) {
      const data = addConvertDataFormat(formData);
      setLocalLoading(true);
      console.log(data);
      try {
        const response = addingStudent
          ? await axios.post("/api/students/add/", data, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authTokens.access}`,
              },
            })
          : await axios.put(`/api/students/${data.id}/update/`, data, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authTokens.access}`,
              },
            });
        console.log(response);
        if (response.status === 200) {
          setLocalLoading(false);
          setShowModal(false);
          setType("");
          setRefStudentList(!refStudentList);
        }
      } catch (err) {
        console.error("Error sending data:", err);
        setLocalLoading(false);
      }
    }
  };

  useEffect(() => {
    const isValid =
      formData?.class !== "" &&
      formData?.firstName !== "" &&
      formData?.lastName !== "" &&
      formData?.parentName !== "" &&
      formData?.email.includes("@") &&
      formData?.email.includes(".") &&
      (formData?.contact).length >= 10 &&
      !compareObjects(formData, data);
    if (isValid !== ableToSubmit) setAbleToSubmit(isValid);
  }, [formData, data]);

  useEffect(() => {
    const fetchClasses = async () => {
      setInitialLoading(true);
      try {
        // fetch the classes
        const response = await axios.get("/api/Class", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        });
        // console.log(response.data);

        const classes = response.data.filter(
          (classs) => classs.niveau === grade //s m p conditions
        );
        // console.log(classes);

        setOptions([
          "",
          ...classes.map(
            (classs) => classs.num_classe + classs.niveau + classs.année
          ),
        ]);

        setOptionsIds(classes.map((classs) => classs.id));

        setInitialLoading(false);
      } catch (e) {
        console.log(e);
        setInitialLoading(false);
      }
    };
    fetchClasses();
    // console.log(options);
    // console.log(optionsIds);
  }, [grade]);

  const handleInputChange = useCallback((fieldName, value) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  }, []);

  return (
    <div className="sm:w-[60%] w-[90%] h-fit bg-white rounded-xl gap-5 flex flex-col shadow-lg p-5">
      <h1 className="text-xl font-bold  text-blueTitle">
        {addingStudent ? "Add a Student" : "Modify A Student"}
      </h1>

      <div className="bg-white flex flex-wrap gap-3 p-2 sm:pl-8 sm:justify-center ">
        <div className="w-[45%] max-w-[300px] ">
          <LabeledInput
            data={{
              name: "firstName",
              label: "First Name *",
              example: "Enter first name",
              value: formData.firstName,
            }}
            type="text"
            onChange={(value) => handleInputChange("firstName", value)}
          />
        </div>
        <div className="w-[45%] max-w-[300px] ">
          <LabeledInput
            data={{
              name: "lastName",
              label: "Last Name *",
              example: "Enter last name",
              value: formData.lastName,
            }}
            type="text"
            onChange={(value) => handleInputChange("lastName", value)}
          />
        </div>
        <div className="w-[45%] max-w-[300px] ">
          <LabeledInput
            data={{
              name: "email",
              label: "Email *",
              example: "Enter email",
              value: formData.email,
            }}
            type="email"
            onChange={(value) => handleInputChange("email", value)}
          />
        </div>
        <div className="w-[45%] max-w-[300px] ">
          <LabeledInput
            data={{
              name: "contact",
              label: "Contact *",
              example: "Enter number",
              value: formData.contact,
            }}
            type="tel"
            onChange={(value) => handleInputChange("contact", value)}
          />
        </div>
        <div className="w-[45%] max-w-[300px] ">
          <LabeledInput
            data={{
              name: "parentName",
              label: "Parent Name *",
              example: "Enter parent name",
              value: formData.parentName,
            }}
            type="text"
            onChange={(value) => handleInputChange("parentName", value)}
          />
        </div>
        <div className="w-[45%] max-w-[300px] ">
          <SelectComp
            label={"Gender"}
            options={["M", "F"]}
            name={"gender"}
            style={
              "mt-2 overflow-y-scroll px-[25px] placeholder:text-textgray text-black w-full h-12 p-0 border shadow-sm border-borderColor text-[15px] sm:text-[18px] font-kumbhfont font-medium rounded-lg mb-4 outline-none"
            }
            onChange={(value) => handleInputChange("gender", value)}
          />
        </div>
        <div className="w-[45%] max-w-[300px] ">
          <SelectComp
            label={"Grade"}
            options={["PRM", "CEM", "LYCEE"]}
            name={"grade"}
            style={
              "mt-2 overflow-y-scroll px-[25px] placeholder:text-textgray text-black w-full h-12 p-0 border shadow-sm border-borderColor text-[15px] sm:text-[18px] font-kumbhfont font-medium rounded-lg mb-4 outline-none"
            }
            onChange={(value) => {
              handleInputChange("grade", value);
              setGrade(value === "PRM" ? "P" : value === "CEM" ? "M" : "S");
            }}
          />
        </div>
        <div className="w-[45%] max-w-[300px] ">
          {/* Available Classes in specific  */}
          <SelectComp
            loading={initialLoading}
            label={"Class"}
            options={options}
            name={"grade"}
            style={
              "mt-2 overflow-y-scroll px-[25px] placeholder:text-textgray text-black w-full h-12 p-0 border shadow-sm border-borderColor text-[15px] sm:text-[18px] font-kumbhfont font-medium rounded-lg mb-4 outline-none"
            }
            onChange={(value) => handleInputChange("class", value)}
          />
        </div>
      </div>
      {anError && (
        <p className="w-full mt-[-40px] text-rose-700 p-2 rounded-md text-center">
          {anError}
        </p>
      )}

      <div className="flex gap-4 m-2 mt-4 justify-end">
        <div
          onClick={() => {
            setShowModal(false);
            setType("");
          }}
        >
          <Button
            data={{
              style: `cursor-pointer pr-2 h-[50px] sm:h-[60px] w-[110px] sm:w-[150px] gap-3 flex justify-center items-center font-poppins text-white font-[400] bg-primarypurp rounded-[40px]`,
              string: `Cancel`,
            }}
          />
        </div>
        <div
          onClick={() => {
            if (ableToSubmit) {
              handleSubmit();
            } else {
              formData?.lastName === ""
                ? setAnError("Last Name should not be ampty !")
                : formData?.firstName === ""
                ? setAnError("First Name should not be ampty !")
                : formData?.parentName === ""
                ? setAnError("Parent Name should not be ampty !")
                : formData?.email === ""
                ? setAnError("Email should not be ampty !")
                : formData?.contact.length < 10
                ? setAnError("Contact should be valid !")
                : !formData?.email.includes("@") ||
                  !formData?.email.includes(".")
                ? setAnError("Email should be valid ! (fake@exp.com)")
                : formData?.class === ""
                ? setAnError("Class should not be ampty !")
                : setAnError("Something went wrong !");
            }
          }}
        >
          <Button
            loading={loading}
            data={{
              style: `cursor-pointer pr-2 h-[50px] sm:h-[60px] w-[110px] sm:w-[150px] ${
                loading ? "gap-1" : "gap-3"
              }  flex justify-center items-center font-poppins text-white font-[400] ${
                ableToSubmit ? "bg-orange" : "bg-gray-500"
              } rounded-[40px]`,
              string: `Submit`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(StudentForm);
