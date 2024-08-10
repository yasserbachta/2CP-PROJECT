import { useState, useEffect } from "react";
import { LabeledInput, Button, SmallButton } from "../ui";
import { Absence, Absent, Trash } from "../../assets";
import axios from "../../api/axios";
import useAuthTokens from "../../context/AuthTokens";

const AbsentWindow = ({ data }) => {
  // console.log(data);

  const { authTokens } = useAuthTokens();

  const [absences, setAbsences] = useState([]);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    const currentDate = new Date();
    const selectedDate = new Date(date);

    if (selectedDate > currentDate) {
      alert("You cannot select a future date.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `api/Absences/`,
        {
          date: date,
          student: data.id,
          module: 1, //will make it the hidden module
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );
      console.log(response);
      setAbsences([...absences, response.data]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  //fetching the data
  useEffect(() => {
    const fetchAbsences = async () => {
      try {
        const response = await axios.get(`api/students/${data.id}/absences`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        });

        console.log(response);
        setAbsences(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAbsences();
  }, []);

  return (
    <div className="w-[90%] max-w-[900px] h-fit bg-white rounded-xl gap-5 flex flex-col shadow-lg p-5">
      <h1 className="text-xl font-bold  text-blueTitle">Signaler l'absence</h1>
      <div className="bg-white flex flex-wrap gap-3  sm:pl-8 justify-evenly">
        <div className="sm:w-[50%] w-full sm:max-w-[300px]">
          <LabeledInput
            onChange={(e) => {
              setDate(e);
              console.log(e);
            }}
            data={{
              name: "Absence Date",
              label: "Absence Date *",
            }}
            type="date"
          />
          <div onClick={() => handleAdd()}>
            <Button
              loading={loading}
              data={{
                string: "Add",
                style:
                  "bg-orange text-white font-poppins gap-2 px-4 py-2 md:text-[19px] rounded-lg flex cursor-pointer ",
                icon: Absent,
              }}
            />
          </div>
        </div>
        <div className="sm:w-[50%] w-full sm:max-w-[300px] flex  flex-col ">
          <p className="pl-1 mb-2 font-[500] text-[14px] text-[#303972] font-poppins">
            Les Absences *
          </p>
          <div className=" w-full flex flex-col  max-h-[180px] overflow-y-scroll rounded-lg">
            {absences.map((absence) => (
              <AbsenceItem
                date={absence.date}
                id={absence.id}
                setAbsences={setAbsences}
                absences={absences}
                authTokens={authTokens}
              />
            ))}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default AbsentWindow;

const AbsenceItem = ({ date, id, setAbsences, absences, authTokens }) => {
  const [delLoading, setDelLoading] = useState(false);

  const handleDelete = async () => {
    setDelLoading(true);
    try {
      const response = await axios.delete(`api/Absences/${id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      console.log(response);
      setAbsences(absences.filter((absence) => absence.id !== id));
      setDelLoading(false);
    } catch (error) {
      console.error(error);
      setDelLoading(false);
    }
  };

  return (
    <div className="p-2 justify-evenly flex items-center gap-2 w-full border-b">
      <img className="w-[30px] h-[30px]" src={Absence} alt="" />
      <div className="text-primarypurp font-poppins">{date}</div>
      <div onClick={() => handleDelete()}>
        <SmallButton
          loading={delLoading}
          picture={Trash}
          altText="Delete"
          color={"#FF4550"}
          size={"30px"}
        />
      </div>
    </div>
  );
};
