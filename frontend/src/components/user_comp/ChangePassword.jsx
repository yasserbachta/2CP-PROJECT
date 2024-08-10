import React, { useState, useEffect } from "react";
import { Button, LabeledInput } from "../ui";
import { useType, useShowModal } from "../../hooks";
import useAuth from "../../context/AuthContext";
import useAuthTokens from "../../context/AuthTokens";
import { jwtDecode } from "jwt-decode";
import useLoadingP from "../../context/profileLoading";
import axios from "../../api/axios";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [ableToSubmit, setAbleToSubmit] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);

  const { Auth, setAuth } = useAuth();
  const { setAuthTokens, authTokens } = useAuthTokens();
  const { setType } = useType();
  const { setShowModal } = useShowModal();
  const { setLoading } = useLoadingP();

  // const logInAndOut = async () => {
  //   let username = Auth.nom[0] + "_" + Auth.prénom;
  //   if (Auth.role === "admin") username = "ouassim"; //temp
  //   const password = confirmNewPassword;

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

  const handleChangePassword = async () => {
    console.log("submitting...");
    // setLoading(true);
    setLocalLoading(true);

    const sendData = { ...Auth, password: confirmNewPassword };

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

  const handleSubmit = async () => {
    if (oldPassword !== Auth.password) {
      setError("Old password is incorrect !");
      return;
    }

    if (newPassword === oldPassword) {
      setError("New password must be different from old password !");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("Passwords must match !");
      return;
    }

    await handleChangePassword();

    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setError("");
  };

  useEffect(() => {
    const isValid =
      oldPassword.length >= 4 &&
      newPassword.length >= 6 &&
      confirmNewPassword.length >= 6;
    if (isValid !== ableToSubmit) setAbleToSubmit(isValid);
  }, [oldPassword, newPassword, confirmNewPassword]);

  return (
    <div className="sm:w-[60%] w-[90%] h-fit bg-white rounded-xl gap-5 flex flex-col  shadow-lg p-5">
      <h1 className="text-xl font-bold  text-blueTitle">Change Password</h1>
      <div className="bg-white flex flex-col items-center gap-3 p-2 sm:pl-8 sm:justify-center ">
        <div className="w-[45%] max-w-[300px] ">
          <LabeledInput
            data={{
              name: "oldPassword",
              label: "Old Password ",
              example: "Enter old password",
            }}
            type="password"
            onChange={(value) => setOldPassword(value)}
          />
        </div>
        <div className="w-[45%] max-w-[300px] ">
          <LabeledInput
            data={{
              name: "newPassword",
              label: "New Password ",
              example: "Enter new password",
            }}
            type="password"
            onChange={(value) => setNewPassword(value)}
          />
        </div>
        <div className="w-[45%] max-w-[300px] ">
          <LabeledInput
            data={{
              name: "confirmPassword",
              label: "Confirm Password",
              example: "confirm new password",
            }}
            type="password"
            onChange={(value) => setConfirmNewPassword(value)}
          />
        </div>
        {error && <div className=" text-red">{error}</div>}
      </div>
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
}

export default ChangePassword;
