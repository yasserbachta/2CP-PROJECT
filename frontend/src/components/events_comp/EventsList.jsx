import { useState, useCallback } from "react";
import { NoStudent } from "../../assets";
import { EventElement } from "./";
import AddingElement from "../AddingElement";
import { Overlay } from "../ui";
import { useShowModal, useType, useSelectedEvent } from "../../hooks/";
import { findEventById } from "../../constants";
import useAuth from "../../context/AuthContext";

function EventsList({ user, events }) {
  const { Auth } = useAuth();
  const { showModal } = useShowModal();
  const { type } = useType();
  events = events || [];
  events = events.filter((event) => event !== null || event !== undefined);

  const [title, setTitle] = useState("");

  const { selectedId, _ } = useSelectedEvent();

  const handleTitleChange = useCallback((value) => {
    setTitle(value);
  }, []);

  const handleVotingYes = useCallback((e) => {
    //logic to send the vote to the server (event id and user id) thats why it might require some evntElement data
  }, []);

  const handleVotingNo = useCallback((e) => {
    //logic to send the vote to the server (event id and user id)
  }, []);

  if (events.length === 0) {
    return (
      <>
        <div className="flex  w-[89vw] xs:w-auto flex-col gap-3 gap-x-0 sm:gap-8 sm:gap-x-8 items-center ">
          {Auth.role === "admin" && (
            <AddingElement
              user={user} //will be replaced
              onChange={(value) => handleTitleChange(value)}
              page={"events"}
            />
          )}
          <div className="m-4 flex flex-col flex-wrap w-[75%] sm:bg-white justify-center items-center gap-2 rounded-xl p-2 py-8">
            <img src={NoStudent} alt="No students" className="mb-3" />
            <h1 className="text-lg font-bold text-[#303972]">
              No Events at this time
            </h1>
            <h3 className=" text-center">
              You will get notified as soon as new events are posted
            </h3>
          </div>
        </div>
        {type === "AddEvent" && showModal && <Overlay data={title} />}
      </>
    );
  } else {
    return (
      <>
        <div className="flex  w-[89vw] xs:w-auto flex-col gap-3 gap-x-0 sm:gap-8 sm:gap-x-8 items-center ">
          {Auth.role === "admin" && (
            <AddingElement
              user={user}
              onChange={(value) => handleTitleChange(value)}
              page={"events"}
            />
          )}
          {events.map((event) => {
            return (
              <EventElement
                key={event.id}
                user={Auth.role}
                eventData={event}
                yesClick={(e) => handleVotingYes(e)}
                noClick={(e) => handleVotingNo(e)}
              />
            );
          })}
        </div>
        {type === "AddEvent" && showModal && <Overlay data={title} />}
        {(type === "EditEvent" || type === "DeleteEvent" || type === "Votes") &&
          showModal && <Overlay data={findEventById(events, selectedId)} />}
      </>
    );
  }
}

export default EventsList;
