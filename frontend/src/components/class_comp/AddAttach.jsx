import { Button, LabeledInput } from "../ui";
import SelectComp from "../SelectComp";
import { useState, useRef } from "react";
import { Upload } from "../../assets";
import { useType, useShow } from "../../hooks";
import axios from "../../api/axios";
import useAuthTokens from "../../context/AuthTokens";
import useAuth from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import refrechHandler from "../../context/refrechHandler";

const AddAttach = ({ titlep = "" }) => {
  const { setShow } = useShow();
  const { setType } = useType();
  const { authTokens } = useAuthTokens();
  const { Auth } = useAuth();
  const { refCorsesList, setRefCorsesList } = refrechHandler();

  const param = useParams();

  const [file, setFile] = useState(null);
  const [attachType, setAttachType] = useState("cours");
  const [ableToSubmit, setAbleToSubmit] = useState(false);
  const [title, setTitle] = useState(titlep);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filePath, setFilePath] = useState("");

  const handleFileSelection = (file) => {
    if (title !== "") setAbleToSubmit(true);
    setFile(file);
    console.log(file);
  };

  const handleFileUpload = async () => {
    console.log("uploading...");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "vtxres570000");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/djimnth7u/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.error) {
        throw new Error(response.data.error.message);
      }

      const uploadedFileUrl = response.data.secure_url;
      console.log("Uploaded");
      console.log(uploadedFileUrl);
      setFilePath(uploadedFileUrl);
      return uploadedFileUrl;
    } catch (error) {
      console.error("Upload Error:", error);
    }
  };

  const handleSending = async () => {
    if (ableToSubmit) {
      setLoading(true);
      try {
        const newFilePath = await handleFileUpload();

        const response = await axios.post(
          `/api/Courses/`,
          {
            type: attachType.toLowerCase(),
            file: newFilePath,
            title: title,
            created: new Date().toISOString(),
            teacher: Auth.teacher_id,
            description: "empty for now",
            Class: param.classId,
            module: param.moduleId,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authTokens.access}`,
            },
          }
        );
        console.log(response);
        setLoading(false);
        setType("");
        setShow(false);
        setRefCorsesList(!refCorsesList);
        window.location.reload();
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    } else {
      setError("Please fill all the fields !");
    }
  };

  return (
    <div className=" font-poppins w-[95%] sm:w-[80%] md:w-[60%] max-w-[650px] h-fit bg-white rounded-xl  shadow-lg p-3 sm:px-12 ">
      <div className=" justify-center flex sm:justify-between items-center flex-col sm:flex-row   w-full">
        <div className=" w-full sm:w-[45%] max-w-[300px]">
          <LabeledInput
            onChange={(e) => {
              setTitle(e);
              if (e !== "" && file) setAbleToSubmit(true);
              else setAbleToSubmit(false);
            }}
            data={{
              name: "attachTitle",
              label: "Title *",
              example: "Cours de passé composé",
              value: title,
            }}
            type="text"
            customStyling={
              "overflow-y-scroll px-[25px] placeholder:text-textgray text-black w-full h-12 p-0 border shadow-sm border-borderColor text-[15px] sm:text-[18px] font-kumbhfont font-medium rounded-lg mb-4 outline-none placeholder:text-[15px]"
            }
          />
        </div>
        <div className="w-full sm:w-[45%] max-w-[300px]">
          <SelectComp
            label="type"
            onChange={setAttachType}
            name={"AttachementTypes"}
            options={["Cours", "Devoir", "Epreuves", "Evaluation Continue "]}
            style={
              "mt-2 overflow-y-scroll px-[25px] placeholder:text-textgray text-black w-full h-12 p-0 border shadow-sm border-borderColor text-[15px] sm:text-[18px] font-kumbhfont font-medium rounded-lg mb-4 outline-none"
            }
          />
        </div>
      </div>
      <br />
      <div className="flex justify-center items-center gap-4 sm:justify-between mb-[35px] flex-col sm:flex-row sm:items-end">
        <div className="w-[45%] max-w-[300px] flex flex-col justify-start items-center">
          <FileUploaderWrapper onFileSelected={handleFileSelection} />
          {!file && (
            <p className="text-primarypurp hidden sm:block text-[16px] font-[600]">
              CLICK TO UPLOAD YOUR FILE
            </p>
          )}
          {file && (
            <p className="text-[#88969C] text-center font-[500] text-[15px]">
              Selected File: {file.name}
            </p>
          )}
        </div>
        <div className="flex sm:justify-end sm:items-end  h-full justify-center">
          <div
            onClick={() => {
              handleSending();
            }}
          >
            <Button
              loading={loading}
              data={{
                style: `cursor-pointer pr-2 h-[50px] sm:h-[60px] w-[110px] sm:w-[150px] gap-3 flex justify-center items-center font-poppins text-white font-[400] rounded-[40px] ${
                  ableToSubmit ? "bg-[#FB7D5B]" : "bg-gray-500"
                }`,
                string: `Add`,
              }}
            />
          </div>
        </div>
      </div>
      {error && <p className=" text-red w-full text-center"> {error} </p>}
    </div>
  );
};

const FileUploaderWrapper = ({ onFileSelected }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      const event = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      });
      fileInputRef.current.dispatchEvent(event); // Simulate click (use with caution)
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    if (onFileSelected) onFileSelected(event.target.files[0]);
  };

  return (
    <div>
      <button onClick={handleClick}>
        <img src={Upload} alt="" />
      </button>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }} // Hide the underlying input
      />
    </div>
  );
};
export default AddAttach;
