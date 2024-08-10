import { Spinner } from "@nextui-org/react";

function SmallButton({
  picture,
  altText,
  hoverText = "",
  color,
  size,
  loading = false,
}) {
  const buttonStyles = {
    backgroundColor: color,
    width: size,
    height: size,
  };

  return (
    <div
      className={`group relative rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-all`}
      style={buttonStyles}
    >
      {!loading && <img src={picture} alt={altText} className="w-3/5 h-3/5" />}
      {loading && <Spinner size="small" color="white" />}
      <div
        className={` ${
          hoverText == ""
            ? ""
            : "absolute top-full mt-0.5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-300 bg-gray-600 text-white text-xs px-2 py-1 rounded-md"
        }`}
        style={{ zIndex: 1 }}
      >
        {hoverText}
      </div>
    </div>
  );
}

export default SmallButton;
