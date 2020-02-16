import React from "react";

import Button from "./Button";

const SetControls = ({ data, setData, parentId }) => {
  const id = React.useRef(0);

  const onChange = e => {
    const values = [...data.excersises];
    values[parentId].sets[e.target.id][e.target.name] = parseInt(
      e.target.value
    );

    setData({
      ...data,
      excersises: values,
    });
  };

  const addSet = e => {
    const values = [...data.excersises];

    id.current++;

    values[parentId].sets = [
      ...values[parentId].sets,
      { id: id.current, parentId, weight: 0, reps: 0 },
    ];

    setData({
      ...data,
      excersises: values,
    });
  };

  const deleteSet = e => {
    const values = [...data.excersises];

    values[parentId].sets = [
      ...data.excersises[parentId].sets.slice(0, parseInt(e.target.id)),
      ...data.excersises[parentId].sets.slice(parseInt(e.target.id) + 1),
    ];

    setData({
      ...data,
      excersises: values,
    });
  };

  return (
    <>
      {data.excersises[parentId].sets.map((set, idx) => (
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
