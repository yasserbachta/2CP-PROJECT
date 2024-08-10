import React from "react";
import { Spinner } from "@nextui-org/react";

const SelectComp = ({
  label = "",
  options,
  name,
  style,
  onChange,
  labelStyle = "",
  nbr = 0,
  loading = false,
}) => {
  const handleChange = (event) => {
    onChange(event.target.value); // je sais pas wla nta li zidtha mohim nice work hanoni -> sank u  :3
  };
  return (
    <>
      <label
        className={`pl-1 font-[500] text-[14px] text-[#303972] font-poppins ${labelStyle}`}
      >
        {label} {`${label === "" ? "" : "*"}`}
        <br />
        {!loading && (
          <select className={`${style}`} name={name} onChange={handleChange}>
            {options.map((option, index) => {
              if (index == nbr) {
                return (
                  <option
                    selected
                    key={index}
                    className="text-[#363B64]"
                    value={option}
                  >
                    {option}
                  </option>
                );
              } else {
                return (
                  <option key={index} className="text-[#363B64]" value={option}>
                    {option}
                  </option>
                );
              }
            })}
          </select>
        )}
        {loading && (
          <div className={`flex items-center justify-center ${style}`}>
            <Spinner size="sm" />
          </div>
        )}
      </label>
    </>
  );
};

export default SelectComp;
