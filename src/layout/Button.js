import React from "react";

const Button = ({ onClick, children, type = "button", id, disabled }) => {
  return (
    <button type={type} onClick={onClick} id={id} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
