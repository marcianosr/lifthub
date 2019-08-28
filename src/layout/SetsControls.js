import React from "react";

import Button from "./Button";

const SetControls = ({ data, setData, parentId }) => {
  const id = React.useRef(0);

  const onChange = e => {
    const values = [...data.program];
    values[parentId].sets[e.target.id][e.target.name] = e.target.value;

    setData({
      ...data,
      program: values,
    });
  };

  const addSet = e => {
    const values = [...data.program];

    id.current++;

    values[parentId].sets = [
      ...values[parentId].sets,
      { id: id.current, parentId, weight: "", reps: "" },
    ];

    setData({
      ...data,
      program: values,
    });
  };

  const deleteSet = e => {
    const values = [...data.program];

    values[parentId].sets = [
      ...data.program[parentId].sets.slice(0, parseInt(e.target.id)),
      ...data.program[parentId].sets.slice(parseInt(e.target.id) + 1),
    ];

    setData({
      ...data,
      program: values,
    });
  };

  return (
    <>
      {data.program[parentId].sets.map((set, idx) => (
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
      ))}
      <Button onClick={addSet}>Add new set</Button>
    </>
  );
};

export default SetControls;
