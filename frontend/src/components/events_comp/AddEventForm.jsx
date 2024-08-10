import { useState, useCallback, useEffect, memo } from "react";
import {LabeledInput} from "../ui";
import { amptyEvent } from "../../constants";
import {useType , useShowModal} from "../../hooks";
const AddEventForm = ({title = "" }) => {
  const { setShowModal } = useShowModal();
  const { setType } = useType();
  //event data is the object that will be sent to the server
  const [eventData, setEventFormData] = useState({
    ...amptyEvent,
    title: title,
  });

  const [ableToSubmit, setAbleToSubmit] = useState(false);

  const handleInputChange = useCallback((fieldName, value) => {
    setEventFormData((prev) => ({ ...prev, [fieldName]: value }));
  }, []);

  const handleCheckboxChange = useCallback(() => {
    setEventFormData((prev) => ({ ...prev, votes: !prev.votes }));
  }, []);


  useEffect(() => {
    //checking if the form is submittable
    const isValid =
      eventData?.title !== "" &&
      eventData?.date !== "" &&
      eventData?.start !== "" &&
      eventData?.description !== "";
    if (isValid !== ableToSubmit) setAbleToSubmit(isValid);
  }, [eventData]);

  return (
      <div
        className="sm:w-[60%] w-[90%] h-fit  bg-white rounded-xl gap-5 flex flex-col shadow-lg p-3 sm:p-5 items-center">
        <div className="bg-white flex flex-wrap gap-3 p-2 sm:pl-8 sm:justify-center">
          <div className="w-[45%] max-w-[300px]">
          <LabeledInput
            data={{
              name: "eventTitle",
              label: "Title *",
              example: "Trip to ...",
              value: eventData.title,
            }}
            type="text"
            customStyling={''}
            onChange={(value) => handleInputChange("title", value)}
          />
          </div>
          <div className="w-[45%] max-w-[300px]">
          <LabeledInput
            data={{
              name: "eventDate",
              label: "Event Date *",
              example: "2004-07-29",
              value: eventData.date,
            }}
            type="date"
            customStyling={''}
            onChange={(value) => handleInputChange("date", value)}
          />
          </div>
          <div className="w-[45%] max-w-[300px]">
          <LabeledInput
            data={{
              name: "eventStart",
              label: "Event Starts at *",
              example: "09:00 AM",
              value: eventData.start,
            }}
            type="text"
            customStyling={''}
            onChange={(value) => handleInputChange("start", value)}
          />
          </div>
          <div className="w-[45%] max-w-[300px]">
          <LabeledInput
            data={{
              name: "eventDiscrption",
              label: "Event Discrption *",
              example: "this event is about ...",
              value: eventData.description,
            }}
            type="textarea"
            customStyling={''}
            onChange={(value) => handleInputChange("description", value)}
          />
          </div>
          <div className="w-[45%] max-w-[300px]">
          <LabeledInput
            data={{
              name: "eventEnd",
              label: "Event End at",
              example: "18:00 PM",
              value: eventData.end,
            }}
            type="text"
            customStyling={''}
            onChange={(value) => handleInputChange("end", value)}
          />
          </div>
          <div className="w-[45%] max-w-[300px] flex justify-center items-center">
            
            <label className=" flex gap-4 mt-3 text-base text-[#303972] font-normal font-poppins">
              <input
                type="checkbox"
                style={{ transform: "scale(1.6)" }}
                checked={eventData.votes}
                onChange={handleCheckboxChange}
                className="GGGG"
              />
              Collect Votes
            </label>
          </div>
        </div>
          <div className="flex gap-4">
            <div
              onClick={()=> {
                setShowModal(false);
                setType("");
              }}
              className={`cursor-pointer h-[50px] sm:h-[50px] w-[100px] sm:w-[130px]
              gap-3 flex justify-center items-center font-poppins text-white font-[400]
              bg-primarypurp rounded-[40px] text-center`}
            >
              <button className=" text-center">Cancel</button>
            </div>
            <div
              className={`cursor-pointer  h-[50px] sm:h-[50px] w-[100px] sm:w-[130px]
              gap-3 flex justify-center items-center font-poppins text-white font-[400]
              rounded-[40px] text-center ${
                ableToSubmit ? "bg-orange" : "bg-gray-500"
              }`}
            >
              <button className=" text-center">Add Event</button>
            </div>
          </div>
      </div>
  );
};

export default memo(AddEventForm);
