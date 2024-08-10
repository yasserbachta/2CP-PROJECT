import React, { useState } from "react";
import axios from "../../api/axios";
import { TeacherPicture } from "../ui";
import { Button } from "../ui/";
import { useShowModal, useType } from "../../hooks";
import useAuthTokens from "../../context/AuthTokens";
import useAuth from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { FileUploader } from "react-drag-drop-files";
import useLoadingP from "../../context/profileLoading";

//add refrech for the profile

const UploadPfp = ({ data }) => {
  const { setShowModal } = useShowModal();
  const { setType } = useType();
  const { authTokens, setAuthTokens } = useAuthTokens();
  const { Auth, setAuth } = useAuth();
  const { setLoading } = useLoadingP();

  const [loading, setLoadingLocal] = useState(false);
  const [image, setImage] = useState(null);
  const [display, setDisplay] = useState(null);
  let imageUrl = null;

  // const logInAndOut = async () => {
  //   let username = Auth.nom[0] + "_" + Auth.prénom;
  //   if (Auth.role === "admin") username = "ouassim"; //temp
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

  const handleImageChange = (selectedImage) => {
    setImage(selectedImage);
    setDisplay(URL.createObjectURL(selectedImage));
  };

  const handleImageUpload = async () => {
    console.log("uploading...");
    setLoadingLocal(true);
    const file = image; //will get removed
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "vtxres570000");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/djimnth7u/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      imageUrl = response.data.secure_url;
      setLoadingLocal(false);
      console.log("Uploaded");
    } catch (error) {
      console.error("Upload Error:", error);
      setLoadingLocal(false);
    }
  };

  const handleSubmit = async () => {
    if (display) {
      console.log("submitting...");
      await handleImageUpload();
      setLoading(true);
      console.log("image url", imageUrl);
      if (imageUrl === null) {
        console.log("image url is null");
        return;
      }
      try {
        data.pfp = imageUrl;
        data.about = data.about || "no about"; //temp till backend fix
        data.location = data.location || "no location"; //temp till backend fix
        console.log(data);
        const response = await axios.put(`/api/profile/update/`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        });
        console.log(response);
        if (response.status === 200) {
          console.log("updated successfully");
          setType("");
          setShowModal(false);
          // console.log(response);
          // await logInAndOut();
          const newKeys = {
            refresh: response.data.refresh,
            access: response.data.access,
          };
          setAuthTokens(newKeys);
          setAuth(jwtDecode(newKeys.access));
          localStorage.setItem("authTokens", JSON.stringify(newKeys));
          setLoading(false);
        }
      } catch (err) {
        console.error("Error sending data:", err);
        setLoading(false);
      }
    }
  };

  return (
    <div
      className={`md:w-[50%] w-[90%] max-w-[600px] h-fit  bg-white rounded-xl
                gap-5 flex flex-col shadow-lg p-5 items-center
                transition-opacity `}
    >
      <FileUploader
        handleChange={handleImageChange}
        name="Picture"
        types={["JPG", "PNG", "JPEG"]}
        maxSize={1}
      />
      {!display && (
        <TeacherPicture
          krahti={false}
          pfp={data.pfp}
          size="150px"
          extraClassName=""
        />
      )}
      {display && (
        <div className="flex  items-center rounded-full overflow-hidden w-[150px] h-[150px]">
          <div className="object-cover w-full h-full">
            <img
              src={display}
              alt="pfp"
              className="rounded-full object-cover w-full h-full"
            />
          </div>
        </div>
      )}
      <div className="flex gap-2">
        <span
          onClick={() => {
            setType("");
            setShowModal(false);
          }}
        >
          <Button
            data={{
              style: `cursor-pointer pr-2 h-[50px] sm:h-[60px] w-[110px] sm:w-[150px] gap-3 flex justify-center items-center font-poppins text-white font-[400] bg-primarypurp rounded-[40px]`,
              string: `Cancel`,
            }}
          />
        </span>
        <span onClick={() => handleSubmit()}>
          <Button
            loading={loading}
            data={{
              style: `cursor-pointer pr-2 h-[50px] sm:h-[60px] w-[110px] sm:w-[150px] ${
                loading ? "gap-1" : "gap-3"
              } flex justify-center items-center font-poppins text-white font-[400] ${
                image ? "bg-orange" : "bg-gray-500"
              } rounded-[40px]`,
              string: `Change`,
            }}
          />
        </span>
      </div>
    </div>
  );
};

export default UploadPfp;
