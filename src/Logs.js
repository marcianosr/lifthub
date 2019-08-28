import React from "react";
import { Link } from "react-router-dom";

import Block from "./layout/Block";

const Logs = () => {
  const localStorageKeys = Object.keys(localStorage).filter(item =>
    item.includes("training") ? item : null
  );

  const items = localStorageKeys.map(key => localStorage.getItem(key));

  return items.map((item, i) => {
    const data = JSON.parse(item);

    return (
      <Block key={i}>
        <Link to={`log/${data.date}`}>
          <h1>{data.name}</h1>
        </Link>

        <time>{data.date}</time>
        <div>
          <Link to={`edit/${data.date}`}>Edit log</Link>
        </div>
      </Block>
    );
  });
};

export default Logs;
