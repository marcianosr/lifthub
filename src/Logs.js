import React from "react";
import { Link } from "react-router-dom";

import Block from "./layout/Block";
import ListItem from "./layout/ListItem";
import { mockData } from "./mockData";

const calculateVolume = mockData => {
  return mockData.map(data => {
    return {
      [data.name]: data.program.reduce((acc, item) => {
        return {
          ...acc,
          [item.excersise]: item.sets.reduce((acc, it) => {
            return acc + it.weight * it.reps;
          }, 0),
        };
      }, {}),
    };
  });
};

const Logs = () => {
  const localStorageKeys = Object.keys(localStorage).filter(item =>
    item.includes("training") ? item : null
  );

  const items = localStorageKeys.map(key => localStorage.getItem(key));

  return items.map((item, i) => {
    const data = JSON.parse(item);

    return (
      <Block key={i}>
        <h1>{data.name}</h1>
        <time>{data.date}</time>
        <Link to={`edit/${data.date}`}>Edit log</Link>
      </Block>
    );
  });
};

export default Logs;
