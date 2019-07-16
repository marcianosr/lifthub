import React from "react";

const Block = ({ title, styles, children }) => {
  return (
    <section>
      {title && <h1>{title}</h1>}
      {children}
    </section>
  );
};

export default Block;
