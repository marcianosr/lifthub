import React from "react";

import Button from "./Button";

const SetControls = ({ program, setProgramState, parentId }) => {
  const [id, setId] = React.useState(1);

  const onChange = e => {
    const values = [...program];
    values[parentId].sets[e.target.id][e.target.name] = e.target.value;

    setProgramState(values);
  };

  const addSet = e => {
    setId(id => id + 1);

    const values = {
      ...program[parentId],
      sets: [
        ...program[parentId].sets,
        {
          id,
          parentId,
          weight: "",
          reps: "",
        },
      ],
    };

    setProgramState([values]);
  };

  const deleteSet = e => {
    const deletedValues = {
      ...program[parentId],
      sets: [
        ...program[parentId].sets.filter(
          (value, idx) => idx !== parseInt(e.target.id)
        ),
      ],
    };

    setProgramState([deletedValues]);
  };

  return (
    <>
      {program[parentId].sets.map((set, idx) => {
        {
          console.log("s", set);
        }

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
