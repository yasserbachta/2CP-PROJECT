import { useCallback, memo, useState } from "react";
import {
  CalendarR,
  Clock,
  noVote,
  yesVote,
  Edit,
  Votes,
  Trash,
} from "../../assets";
import { IconText, SmallButton } from "../ui";
import { useShowModal, useType, useSelectedEvent } from "../../hooks";

const EventElement = ({ user, eventData, yesClick, noClick }) => {
  const [voted, setVoted] = useState({ yes: false, no: false });
  const { setShowModal } = useShowModal();
  const { setType } = useType();
  const { _, setSelectedId } = useSelectedEvent();

  const time =
    eventData?.end && eventData.end !== ""
      ? eventData.start + " - " + eventData.end
      : eventData.start;

  const handleYes = useCallback((e) => {
    if (voted.yes) return;
    yesClick(e);
    //logic .....
    setVoted(() => ({ yes: true, no: false }));
  }, []);

  const handleNo = useCallback((e) => {
    if (voted.no) return;
    noClick(e);
    //logic .....
    setVoted(() => ({ yes: false, no: true }));
  }, []);

  const handleEdit = useCallback(() => {
    setSelectedId(eventData.id);
    setShowModal(true);
    setType("EditEvent");
  }, []);
  const handleDelete = useCallback(() => {
    setSelectedId(eventData.id);
    setShowModal(true);
    setType("DeleteEvent");
  }, []);
  const handleVotesNumber = useCallback(() => {
    setSelectedId(eventData.id);
    setShowModal(true);
    setType("Votes");
  });

  return (
    <div className="relative flex flex-col sm:flex-row w-[95%] sm:w-[75%] min-h-[175px] rounded-lg overflow-hidden bg-white p-2">
      <div className="absolute top-0 left-0 sm:h-full sm:w-[10px] bg-orange w-full h-[10px]"></div>
      <div className="flex flex-col items-start p-2 pl-[4%] py-[18px] sm:pl-[8%] gap-2">
        <h3 className="text-[#303972] font-poppins font-bold text-[25px] capitalize">
          {eventData.title}
        </h3>
        <p className="font-poppins sm:text-lg text-black pl-2 sm:max-w-[85%] sm:min-w-[372px] ">
          {eventData.description}
        </p>
        <div>
          <IconText
            picture={CalendarR}
            data={eventData.date.split("-").reverse().join("-")}
            size={"35px"}
            extraClass="text-[#A098AE] font-poppins"
          />
          <IconText
            picture={Clock}
            data={time}
            size={"35px"}
            extraClass="text-[#A098AE] font-poppins"
          />
        </div>
      </div>
      {user === "student" && eventData.votes && (
        <div className="sm:absolute sm:top-0 sm:right-0 sm:h-full flex sm:flex-col items-center justify-center gap-6 pb-[2%] sm:pb-0 sm:pr-[3%]">
          <span onClick={handleYes}>
            <SmallButton
              picture={yesVote}
              altText="yesVote"
              hoverText="confirm"
              color={voted.no ? "#999999" : "#4CBC9A"}
              size={"40px"}
            />
          </span>

          <span onClick={handleNo}>
            <SmallButton
              picture={noVote}
              altText="noVote"
              hoverText="deny"
              color={voted.yes ? "#999999" : "#FF4550"}
              size={"40px"}
            />
          </span>
        </div>
      )}
      {user === "admin" && (
        <div className="sm:absolute sm:top-0 sm:right-0 sm:h-full flex sm:flex-col items-center justify-center gap-6 pb-[2%] sm:pb-0 sm:pr-[3%]">
          <span onClick={handleEdit}>
            <SmallButton
              picture={Edit}
              altText="edit"
              hoverText="edit"
              color={"#FCC43E"}
              size={"40px"}
            />
          </span>
          {eventData.votes && (
            <span onClick={handleVotesNumber}>
              <SmallButton
                picture={Votes}
                altText="stats"
                hoverText="Votes"
                color={"#4CBC9A"}
                size={"40px"}
              />
            </span>
          )}
          <span onClick={handleDelete}>
            <SmallButton
              picture={Trash}
              altText="delete"
              hoverText="delete"
              color={"#FF4550"}
              size={"40px"}
            />
          </span>
        </div>
      )}
    </div>
  );
};

export default memo(EventElement);
