import React from "react";

const Block = ({ title, styles, children }) => {
  return (
    <section>
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
};

export default Block;
