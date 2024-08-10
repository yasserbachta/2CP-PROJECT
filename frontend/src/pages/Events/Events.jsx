import { EventsList, EventElement } from "../../components/events_comp";
import { Header } from "../../layout";
import { events, aUser } from "../../constants";

//the aUser thing is temporary till linking with the backend

function Events() {
  return (
    <div className="m-[15px] sm:m-[30px] flex flex-col gap-9 min-h-screen">
      <Header title={"Events"} />
      <EventsList user={aUser} events={events} />
      {/* <EventsList /> */}
      <div className="sm:hidden">
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}

export default Events;
