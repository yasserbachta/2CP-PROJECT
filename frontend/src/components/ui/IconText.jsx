import { SmallButton } from "./";

function IconText({
  picture,
  altText = "",
  hoverText = "",
  color,
  data,
  size,
  extraClass = "",
}) {
  return (
    <div className="flex m-1 my-2 items-center">
      <SmallButton
        picture={picture}
        altText={altText}
        hoverText={hoverText}
        color={color}
        size={size}
      />
      <p className={`text-[#303972] text-base m-1 ml-3 ${extraClass}`}>
        {data}
      </p>
    </div>
  );
}

export default IconText;
