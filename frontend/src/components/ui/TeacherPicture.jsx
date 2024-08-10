import { PencilIcon } from "@heroicons/react/24/solid";

function TeacherPicture({
  pfp,
  size = "20px",
  extraClassName = "",
  krahti = true,
  hoverEffect = false,
}) {
  // Set button styles for the profile picture size
  const buttonStyles = {
    width: size,
    height: size,
  };

  return (
    // Add 'group' class to the outer div
    <div
      className={`group bg-pfpclr rounded-full flex items-center relative justify-center cursor-pointer
                  ${krahti ? "mt-4 mb-3" : ""} ${extraClassName}`}
      style={buttonStyles}
    >
      {/* Display the profile picture if it exists */}
      {pfp && (
        <img
          src={pfp}
          alt="pfp"
          className="rounded-full object-cover w-full h-full"
        />
      )}

      {hoverEffect && (
        <div
          className="absolute flex justify-center items-center top-1/2 left-1/2 rounded-full w-full h-full transform -translate-x-1/2 -translate-y-1/2
                     text-white text-center bg-gray-500 bg-opacity-75px-2 py-1
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="flex justify-center items-center">
            <PencilIcon
              className={`h-[30px] text-white cursor-pointer`}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherPicture;
