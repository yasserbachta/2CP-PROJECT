import React from "react";
import { attached } from "../../assets";
import { Absent } from "../../assets";
import { Trash } from "../../assets";
import { SmallButton } from "../ui";
const NotificationItem = ({ data, bg }) => {
  return (
    <div
      className={`gap-7 ${bg} px-5 py-3 border-b flex justify-between font-poppins items-center`}
    >
      {data.read}
      <div className="relative">
        <SmallButton
          picture={data.type == "attachment" ? attached : Absent}
          altText={data.type == "attachment" ? "Attachment" : "Absence"}
          hoverText={data.type == "attachment" ? "Attachment" : "Absence"}
          color={"#4D44B5"}
          size={"40px"}
        />
        {!data.read && <div className="absolute w-2 h-2 right-0 top-0 bg-orange rounded-full"></div>}
      </div>
      <p className="flex-1">{data.string}</p>
      <SmallButton
        picture={Trash}
        altText="Delete"
        hoverText="Delete"
        color={"#FF4550"}
        size={"30px"}
      />
    </div>
  );
};

export default NotificationItem;
