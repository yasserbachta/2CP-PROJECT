import React, { useState } from "react";
import { Button } from "../components/ui";
import useCsvUrl from "../hooks/csvUrl";
import axios from "../api/axios";
import useAuthTokens from "../context/AuthTokens";
import { useType, useShowModal } from "../hooks";
import refrechHandler from "../context/refrechHandler";
import { FileUploader } from "react-drag-drop-files";

const AddCsv = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [ableToSubmit, setAbleToSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  const { CsvUrl } = useCsvUrl();
  const { authTokens } = useAuthTokens();
  const { setType } = useType();
  const { setShowModal } = useShowModal();

  const {
    refStudentList,
    setRefStudentList,
    refTeacherList,
    setRefTeacherList,
  } = refrechHandler();

  console.log(CsvUrl);
  console.log(csvFile);

  const handleFileChange = (file) => {
    setAbleToSubmit(true);
    setCsvFile(file);
  };

  const handleSubmit = async () => {
    console.log("Sending CSV file:", csvFile);
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("csv_file", csvFile);

      const response = await axios.post(CsvUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      console.log("Response:", response.data);

      if (response.status === 200) {
        setType("");
        setShowModal(false);
        if (CsvUrl.includes("students")) {
          setRefStudentList(!refStudentList);
        } else {
          setRefTeacherList(!refTeacherList);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div
      className="md:w-[50%] w-[90%] max-w-[500px] h-fit  bg-white rounded-xl
                gap-5 flex flex-col shadow-lg p-5 items-center"
    >
      <div className="w-full flex justify-start">
        <h1 className="text-xl font-bold  text-blueTitle">
          Add Multipe{" "}
          {window.location.pathname
            .split("/")[1][0]
            .toUpperCase()
            .concat(location.pathname.split("/")[1].slice(1))}
        </h1>
      </div>
      <FileUploader
        handleChange={handleFileChange}
        name="file"
        types={["CSV"]}
        maxSize={1}
      />
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
        <span
          onClick={() => {
            if (ableToSubmit) {
              handleSubmit();
            }
          }}
        >
          <Button
            loading={loading}
            data={{
              style: `cursor-pointer pr-2 h-[50px] sm:h-[60px] w-[110px] sm:w-[150px] ${
                loading ? "gap-1" : "gap-3"
              } flex justify-center items-center font-poppins text-white font-[400] ${
                ableToSubmit ? "bg-orange" : "bg-gray-500"
              } rounded-[40px]`,
              string: `Submit`,
            }}
          />
        </span>
      </div>
    </div>
  );
};

export default AddCsv;
