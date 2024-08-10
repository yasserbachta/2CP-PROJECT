import { LabeledInput, Button } from "../ui";
import { useState, useEffect, memo } from "react";
import { amptyUser, compareObjects } from "../../constants";
import { useType, useShowModal } from "../../hooks";
import refrechHandler from "../../context/refrechHandler";
import useAuthTokens from "../../context/AuthTokens";
import useAuth from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import useLoadingP from "../../context/profileLoading";
import axios from "../../api/axios";

const EditProfileA = ({ data = amptyUser }) => {
  const { _, setType } = useType();
  const { setShowModal } = useShowModal();
  const [formData, setFormData] = useState(data);
  const { refProfile, setRefProfile } = refrechHandler();
  const { authTokens, setAuthTokens } = useAuthTokens();
  const { Auth, setAuth } = useAuth();
  const { setLoading } = useLoadingP();

  const [ableToSubmit, setAbleToSubmit] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [anError, setAnError] = useState(false);

  // const logInAndOut = async () => {
  //   const username = "ouassim"; //temp
  //   const password = Auth.password;
  //   setAuthTokens(null);
  //   setAuth("changeSituation"); //changeSituation mch null , kain far9 , never change this
  //   localStorage.removeItem("authTokens");
  //   console.log("logged out !");

  //   try {
  //     const response = await axios.post(
  //       "/api/login/",
  //       {
  //         username: username,
  //         password: password,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     if (response.status === 200) {
  //       const data = response.data;
  //       console.log("loged in !");
  //       setAuthTokens(data);
  //       setAuth(jwtDecode(data.access));
  //       localStorage.setItem("authTokens", JSON.stringify(data));
  //     }
  //   } catch (error) {
  //     console.log("Error updating token:", error);
  //     alert("Something went wrong!");
  //     setAuth(null);
  //   }
  // };

  const handleSubmit = async () => {
    console.log("submitting...");
    // setLoading(true);
    setLocalLoading(true);

    const sendData = { ...formData };

    console.log("send Data", sendData);
    try {
      const response = await axios.put(`/api/profile/update/`, sendData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      console.log(response);
      if (response.status === 200) {
        console.log("Profile Updated");
        setRefProfile(!refProfile);
        // await logInAndOut();
        const newKeys = {
          refresh: response.data.refresh,
          access: response.data.access,
        };
        setAuthTokens(newKeys);
        setAuth(jwtDecode(newKeys.access));
        localStorage.setItem("authTokens", JSON.stringify(newKeys));
        setShowModal(false);
        setType("");
        setLocalLoading(false);
      }
    } catch (err) {
      console.error("Error Updating User:", err);
      setLocalLoading(false);
    }
  };

  useEffect(() => {
    const isValid =
      formData?.prénom !== "" &&
      formData?.nom !== "" &&
      formData?.email !== "" &&
      formData?.location !== "" &&
      formData?.email.includes("@") &&
      formData?.email.includes(".") &&
      !compareObjects(formData, data);
    if (isValid !== ableToSubmit) setAbleToSubmit(isValid);
  }, [formData]);

  const handleInputChange = (fieldName, value) => {
    setFormData((formData) => ({ ...formData, [fieldName]: value }));
  };

  return (
    <div className="sm:w-[60%] w-[90%] h-fit bg-white rounded-xl gap-5 flex flex-col  shadow-lg p-5">
      <h1 className="text-xl font-bold  text-blueTitle">Profile Info</h1>

      <div className="bg-white flex flex-wrap gap-3 p-2 sm:pl-8 sm:justify-center ">
        <div className="w-[45%] max-w-[300px] ">
          <LabeledInput
            data={{
              name: "firstName",
              label: "First Name ",
              example: "Enter first name",
              value: formData.prénom,
            }}
            type="text"
            onChange={(value) => handleInputChange("prénom", value)}
          />
        </div>
        <div className="w-[45%] max-w-[300px] ">
          <LabeledInput
            data={{
              name: "lastName",
              label: "Last Name ",
              example: "Enter last name",
              value: formData.nom,
            }}
            type="text"
            onChange={(value) => handleInputChange("nom", value)}
          />
        </div>
        <div className="w-[45%] max-w-[300px] ">
          <LabeledInput
            data={{
              name: "email",
              label: "Email ",
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
              name: "location",
              label: "Location",
              example: "Enter location",
              value: formData.location,
            }}
            type="tel"
            onChange={(value) => handleInputChange("location", value)}
          />
        </div>

        {/* to fix later .. ( prefered ro creat it without using labled info) */}
        <div className="w-[45%] max-w-[300px] ">
          <LabeledInput
            data={{
              name: "info",
              label: "About",
              example: "Tell us about yourself",
              value: formData.about,
            }}
            type="text"
            onChange={(value) => handleInputChange("about", value)}
          />
        </div>

        <div className="w-[45%] pt-9 pr-4 max-w-[300px] h-12  mb-4 outline-none  ">
          {" "}
          <h1
            onClick={() => {
              setType("changePassword");
            }}
            className="  text-center pl-1 font-[500] text-[17px]
                      text-[#303972] font-poppins hover:underline  hover:cursor-pointer"
          >
            change password ?
          </h1>
        </div>

        {/* <div className="w-[45%] max-w-[300px] ">
          <LabeledInput
            data={{
              name: "password",
              label: "Current Password",
              example: "at least 8 characters",
              value: formData.password,
            }}
            type="text"
            onChange={(value) => handleInputChange("password", value)}
          />
        </div> */}
      </div>

      {anError && (
        <p className="w-full mt-[-40px] text-red-700 p-2 rounded-md text-center">
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
              formData?.email === ""
                ? setAnError("Email should not be ampty !")
                : formData?.location === ""
                ? setAnError("Location should not be ampty !")
                : !formData?.email.includes("@") ||
                  !formData?.email.includes(".")
                ? setAnError("Email should be valid ! (fake@exp.com)")
                : formData?.nom === ""
                ? setAnError("Last Name should not be ampty !")
                : formData?.prénom === ""
                ? setAnError("First Name should not be ampty !")
                : setAnError("Something went wrong !");
            }
          }}
        >
          <Button
            loading={localLoading}
            data={{
              style: `cursor-pointer pr-2 h-[50px] sm:h-[60px] w-[110px] sm:w-[150px] ${
                localLoading ? "gap-1" : "gap-3"
              } flex justify-center items-center font-poppins text-white font-[400] ${
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

export default memo(EditProfileA);
