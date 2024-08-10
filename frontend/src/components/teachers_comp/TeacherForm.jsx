import { useState, useEffect, useCallback, memo } from "react";
import { Button, LabeledInput } from "../ui/";
import { compareObjects, EmptyTeacher } from "../../constants";
import axios from "../../api/axios";
import { Header, SearchHead } from "../../layout";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loading from "../../layout/Loading";
import useAuthTokens from "../../context/AuthTokens";
import refrechHandler from "../../context/refrechHandler";
import SelectComp from "../SelectComp";

// to add =====> modules and gender
//               fix the select default

function TeacherForm() {
  const navigate = useNavigate();
  const { authTokens } = useAuthTokens();
  const { refTeacherList, setRefTeacherList } = refrechHandler();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(EmptyTeacher);
  const [formData, setFormData] = useState(data);
  const [ableToSubmit, setAbleToSubmit] = useState(false);
  const [anError, setAnError] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);

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

  const fetchTeacher = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/teachers/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      console.log(response);
      if (response.status === 200) {
        // console.log(response.data);
        const data = {
          gender: response.data?.gender || "",
          firstName: response.data?.prénom || "No firstname",
          lastName: response.data?.nom || "No lastname",
          phone: response.data?.phone_num || "No phone number",
          email: response.data?.email || "No email",
          location: response.data?.location || "No location",
          info: response.data?.about || "No info",
          module: response.data?.module || "",
          classes: response.data?.classes || [],
        };
        setData(data);
        setFormData(data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Teacher:", error);
      setLoading(false);
    }
  };

  const { id } = useParams();
  // console.log(id);

  useEffect(() => {
    if (id) {
      fetchTeacher();
    } else {
      setLoading(false);
    }
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  const addingTeacher = EmptyTeacher === data;

  const addConvertDataFormat = (data) => {
    return {
      prénom: data.firstName, // ,
      nom: data.lastName, //,
      email: data.email, // ,
      phone_num: data.phone, // ,
      location: data.location, // ,
      gender: "M", //data.gender, // not working for now
      about: "No info",
      module: optionsIds[options.indexOf(data.module)], //Number(data.module), //will handle that with  a translating function next time ,
      //           so the user can know what module is that
      // password : "" // idk about this yet
      // pfp : "" // idk about this yet
    };
  };

  const handleSubmit = async () => {
    if (ableToSubmit) {
      setLocalLoading(true);
      const data = addConvertDataFormat(formData);
      console.log(data);
      try {
        const response = addingTeacher
          ? await axios.post(
              "/api/teachers/add/", //`/api/teachers/${id}/update/`
              data,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${authTokens.access}`,
                },
              }
            )
          : await axios.put(
              `/api/teachers/${id}/update/`, //
              data,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${authTokens.access}`,
                },
              }
            );
        console.log(response);
        if (response.status === 200) {
          setRefTeacherList(!refTeacherList);
          goBack();
        }
        setLocalLoading(false);
      } catch (err) {
        console.error("Error sending data:", err);
        setLocalLoading(false);
      }
    } else {
      formData?.lastName === ""
        ? setAnError("Last Name should not be ampty !")
        : formData?.firstName === ""
        ? setAnError("First Name should not be ampty !")
        : formData?.location === ""
        ? setAnError("Location should not be ampty !")
        : formData?.email === ""
        ? setAnError("Email should not be ampty !")
        : formData?.phone.length < 10
        ? setAnError("Phone should be valid !")
        : !formData?.email.includes("@") || !formData?.email.includes(".")
        ? setAnError("Email should be valid ! (fake@exp.com)")
        : setAnError("Something went wrong !");
    }
  };

  useEffect(() => {
    const isValid =
      formData?.firstName !== "" &&
      formData?.lastName !== "" &&
      formData?.email !== "" &&
      formData?.phone !== "" &&
      formData?.location !== "" &&
      formData?.email.includes("@") &&
      formData?.email.includes(".") &&
      formData?.phone.length >= 10 &&
      !compareObjects(formData, data);
    if (isValid !== ableToSubmit) setAbleToSubmit(isValid);
  }, [formData]);

  const handleInputChange = useCallback((fieldName, value) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  }, []);

  const inputsStyling =
    "   h-12 py-[20px] pl-[19px] border shadow-sm border-borderColor text-[15px] sm:text-[18px] font-kumbhfont font-medium placeholder:text-textgray rounded-lg mb-4 outline-none sm:w-[430px]";

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="m-[15px] sm:m-[30px] flex flex-col gap-5 sm:gap-9">
      <Header title={"Teachers"} />
      <SearchHead showSearch={false} showImport={false} showAdd={false} />
      <form className="items-center h-fit rounded-xl overflow-hidden">
        <div className=" flex items-center top-0 left-0 p-4 pl-6 sm:h-[9%] w-full  bg-primarypurp ">
          <h1 className="text-xl font-bold text-white">
            {addingTeacher ? "Add A Teacher" : "Modify A Teacher"}
          </h1>
        </div>
        <div className="h-full w-full rounded-b-xl">
          <div className="bg-white flex  flex-wrap gap-4 sm:gap-8  p-2 sm:pl-8 xs:justify-start justify-center ">
            <LabeledInput
              data={{
                name: "firstName",
                label: "First Name *",
                example: "e.g. Messi",
                value: formData.firstName,
              }}
              type="text"
              onChange={(value) => handleInputChange("firstName", value)}
              customStyling={inputsStyling}
            />
            <LabeledInput
              data={{
                name: "lastName",
                label: "Last Name *",
                example: "e.g. Lionel",
                value: formData.lastName,
              }}
              type="text"
              onChange={(value) => handleInputChange("lastName", value)}
              customStyling={inputsStyling}
            />
            <LabeledInput
              data={{
                name: "email",
                label: "Email *",
                example: "e.g. messi@estin.dz",
                value: formData.email,
              }}
              type="email"
              onChange={(value) => handleInputChange("email", value)}
              customStyling={inputsStyling}
            />
            <LabeledInput
              data={{
                name: "phone",
                label: "Phone *",
                example: "e.g. 123-456-7890",
                value: formData.phone,
              }}
              type="tel"
              onChange={(value) => handleInputChange("phone", value)}
              customStyling={inputsStyling}
            />
            <LabeledInput
              data={{
                name: "adress",
                label: "Adress *",
                example: "e.g. 1234 Main St, New York, NY 10030, USA",
                value: formData.location,
              }}
              type="text"
              onChange={(value) => handleInputChange("location", value)}
              customStyling={inputsStyling}
            />
            <div className="w-[60%] max-w-[300px] ">
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
            <div className="w-[60%] max-w-[300px] ">
              <SelectComp
                label={"Module"}
                options={options}
                name={"module"}
                style={
                  "mt-2 overflow-y-scroll px-[25px] placeholder:text-textgray text-black w-full h-12 p-0 border shadow-sm border-borderColor text-[15px] sm:text-[18px] font-kumbhfont font-medium rounded-lg mb-4 outline-none"
                }
                onChange={(value) => handleInputChange("module", value)}
              />
            </div>
          </div>
        </div>
      </form>
      {anError && (
        <p className="w-full  text-rose-700 p-2 rounded-md text-center">
          {anError}
        </p>
      )}
      <div className="flex gap-4 mt-4 justify-end">
        <Link onClick={goBack}>
          <Button
            data={{
              style: `cursor-pointer pr-2 h-[50px] sm:h-[60px] w-[110px] sm:w-[150px] gap-3 flex justify-center items-center font-poppins text-white font-[400] bg-primarypurp rounded-[40px]`,
              string: `Cancel`,
            }}
          />
        </Link>
        <span onClick={handleSubmit}>
          <Button
            loading={localLoading}
            data={{
              style: `cursor-pointer pr-2 h-[50px] sm:h-[60px] w-[110px] sm:w-[150px] ${
                localLoading ? "gap-1" : "gap-3"
              }  flex justify-center items-center font-poppins text-white font-[400] ${
                ableToSubmit ? "bg-orange" : "bg-gray-500"
              } rounded-[40px]`,
              string: `Submit`,
            }}
          />
        </span>
      </div>
      <div className="sm:hidden">
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}

export default memo(TeacherForm);
