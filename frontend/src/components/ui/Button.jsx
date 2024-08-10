import React from "react";
import { Spinner } from "@nextui-org/react";

const Button = ({ data, loading = false }) => {
  return (
    <div className={`${data.style}`}>
      {loading && <Spinner size="sm" color="default" />}
      <img className={`${data.styleIcon}`} src={data?.icon} alt="" />
      <button>{data.string}</button>
    </div>
  );
};

export default Button;
