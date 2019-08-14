import React from "react";

const Button = ({ onClick, children, type = "button", id }) => {
  return (
    <button type={type} onClick={onClick} id={id}>
      {children}
    </button>
  );
};

export default Button;
