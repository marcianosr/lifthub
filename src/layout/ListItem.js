import React from "react";

const ListItem = ({ title, styles, children }) => {
  return (
    <section>
      {title && <h1>{title}</h1>}
      {children}
      <hr />
    </section>
  );
};

export default ListItem;
