import React from "react";

const Button = ({ onClick, children, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2  mr-2  rounded cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
