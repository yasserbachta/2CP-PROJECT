import { memo } from "react";

function LabeledInput({ data, type = "text", customStyling = "", onChange }) {
  const style =
    customStyling !== ""
      ? customStyling
      : "h-12 py-[20px] pl-[25px] border shadow-sm border-borderColor text-[15px] sm:text-[18px] font-kumbhfont font-medium placeholder:text-textgray placeholder:text-[15px] pr-[12px] rounded-lg mb-4 outline-none";

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="flex flex-col ">
      <label
        htmlFor={data.name}
        className="pl-1 mb-2 font-[500] text-[14px] text-[#303972] font-poppins"
      >
        {data.label}
      </label>
      <input
        type={type}
        id={data.name}
        placeholder={data?.example}
        value={data?.value}
        onChange={handleChange}
        className={`${style}`}
        min={"1"}
      />
    </div>
  );
}

export default memo(LabeledInput);
