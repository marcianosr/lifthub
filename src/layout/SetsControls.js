import React from "react";

import Button from "./Button";

const SetControls = ({ program, setProgramState, parentId }) => {
  const id = React.useRef(0);

  const onChange = e => {
    const values = [...program];
    values[parentId].sets[e.target.id][e.target.name] = e.target.value;

    setProgramState(values);
  };

  const addSet = e => {
    const values = [...program];

    id.current++;

    values[parentId].sets = [
      ...values[parentId].sets,
      { id: id.current, parentId, weight: "", reps: "" },
    ];

    setProgramState(values);
  };

  const deleteSet = e => {
    const values = [...program];

    values[parentId].sets = [
      ...program[parentId].sets.slice(0, parseInt(e.target.id)),
      ...program[parentId].sets.slice(parseInt(e.target.id) + 1),
    ];

    setProgramState(values);
  };

  return (
    <>
      {program[parentId].sets.map((set, idx) => {
        return (
          <fieldset key={idx}>
            <label>Weight</label>
            <input
              id={idx}
              type="number"
              value={set.weight}
              name="weight"
              onChange={onChange}
            />
            <label>Reps</label>
            <input
              id={idx}
              type="number"
              value={set.reps}
              name="reps"
              onChange={onChange}
            />
            <Button id={idx} onClick={deleteSet}>
              Delete set
            </Button>
          </fieldset>
        );
      })}
      <Button onClick={addSet}>Add new set</Button>
    </>
  );
};

export default SetControls;
