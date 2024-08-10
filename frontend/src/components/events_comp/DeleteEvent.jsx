import { useShowModal, useType } from "../../hooks";

const DeleteEvent = ({ data }) => {
  const { setShowModal } = useShowModal();
  const { setType } = useType();
  return (
    <div className="flex flex-col justify-center items-center bg-white p-12 rounded-lg ">
      <p>Are you sure you want to delete?</p>

      <br />
      <h2 className="text-[#303972] font-poppins font-bold text-[25px] capitalize">
        {data?.title}
      </h2>
      <br />
      {data?.votes && (
        <p>
          {" "}
          The event have currently{" "}
          {data.votersListNo.length + data.votersListYes.length} votes{" "}
        </p>
      )}
      <div className="flex justify-end mt-6 ">
        <button className="mr-2 px-4 py-2 bg-red text-white rounded-xl">
          Confirm
        </button>
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded-xl"
          onClick={() => {
            setShowModal(false);
            setType("");
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteEvent;
