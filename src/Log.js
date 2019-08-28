import React from "react";

import useForm from "./hooks/useForm";

const calculateVolume = data => {
  return data.program.reduce((acc, item) => {
    return [
      ...acc,
      {
        excersise: item.excersise,
        volume: item.sets.reduce((acc, it) => {
          return acc + it.weight * it.reps;
        }, 0),
        sets: item.sets,
      },
    ];
  }, []);
};
const Log = ({ match }) => {
  const [data] = useForm(match.params.date);

  return (
    <>
      <h1>{data.name}</h1>
      <time>{data.date}</time>
      <section>
        {calculateVolume(data).map(item => (
          <>
            <h2>{item.excersise}</h2>
            <ol>
              {item.sets.map((set, idx) => (
                <li key={idx}>
                  Weight: {set.weight} Reps: {set.reps}
                </li>
              ))}
            </ol>
            <p>Total volume: {item.volume}</p>
            <p>Total sets: {item.sets.length}</p>
          </>
        ))}
      </section>
    </>
  );
};

export default Log;
