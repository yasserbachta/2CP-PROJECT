import { useShowModal, useType } from "../../hooks";
import { check, xmark } from "../../assets";
function Votes({ data }) {
  const { setShowModal } = useShowModal();
  const { setType } = useType();
  return (
    <div className="flex flex-col font-poppins w-[90%] max-w-[700px] justify-center items-center bg-white p-12 rounded-lg gap-2">
      <p>Event Voting Stats</p>
      <h2 className="text-[#303972] font-bold text-[25px] capitalize text-center">
        {data?.title}
      </h2>

      {data?.votes && (
        <p className="text-center">
          {" "}
          The event have currently{" "}
          {data.votersListNo.length + data.votersListYes.length} votes{" "}
        </p>
      )}
      <br />

      <div className="hidden  gap-5 sm:flex justify-between w-[90%] m-auto ">
        {/* // confirm votes */}
        <div className="flex flex-col bg-bgpurp rounded-md p-2 justify-start items-center gap-3">
          <div className="flex gap-3">
            <p className="">Yes Votes</p>
            <img className="w-[15px]" src={check} alt="" />
          </div>
          <div className="overflow-y-scroll rounded-md h-[180px] px-8 flex gap-2 flex-col">
            <Voter  />
            <Voter />
            <Voter />
            <Voter />
            <Voter />
            <Voter />
          </div>
        </div>
        <div className="flex flex-col justify-start  items-center   bg-bgpurp rounded-md p-2 gap-3">
          <div className="flex gap-3">
            <p className="">No Votes</p>
            <img className="w-[15px]" src={xmark} alt="" />
          </div>
          <div className="overflow-y-scroll px-8  rounded-md h-[180px] flex gap-2 flex-col">
            <Voter  />
            <Voter />
            <Voter />
            <Voter />
            <Voter />
            <Voter />
          </div>
        </div>
      </div>
      {/* will add the list of the votes (confirm and deny) */}

      <div className="flex justify-end mt-6 ">
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded-xl"
          onClick={() => {
            setShowModal(false);
            setType("");
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Votes;

function Voter({ data }) {
  return (
    <div className="flex items-center gap-2 p-1">
      {/* user.pfp */}
      <div className="h-[30px] w-[30px] bg-pfpclr rounded-full"></div>
      {/* user.name */}
      <p>Yasser Bachta</p>
    </div>
  );
}
