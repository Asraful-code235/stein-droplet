// components/TextField.js
import React from "react";

const TextField = ({ type = "text", id, placeholder, rounded = "md", ...props }:any) => {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className={`w-full px-4 py-2 bg-[#EFEEEE] rounded-${rounded} focus:outline-none focus:ring-2 focus:ring-blue-500`}
      {...props}
    />
  );
};

export default TextField;