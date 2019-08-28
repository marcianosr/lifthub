import React from "react";

import useForm from "./hooks/useForm";

const calculateVolume = data => {
  return data.program.reduce((acc, item) => {
    return [
      ...acc,
      {
        ["excersise"]: item.excersise,
        volume: item.sets.reduce((acc, it) => {
          return acc + it.weight * it.reps;
        }, 0),
        sets: item.sets.length,
      },
    ];
  }, []);
};
const Log = ({ match }) => {
  const [data] = useForm(match.params.date);

  console.log(calculateVolume(data));
  return (
    <>
      <h1>{data.name}</h1>
      <time>{data.date}</time>
      <section>
        {calculateVolume(data).map(item => (
          <>
            <h2>{item.excersise}</h2>
            <span>Total volume: {item.volume}</span>

            <span>Total sets: {item.sets}</span>
          </>
        ))}
      </section>
    </>
  );
};

export default Log;
