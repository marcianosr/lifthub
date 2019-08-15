import React from "react";
import SetsControls from "./SetsControls";
import Button from "./Button";

const ExcersiseControls = ({ program, setProgramState }) => {
  const id = React.useRef(0);

  const addExcersise = e => {
    setProgramState([
      ...program,
      {
        id: id.current,
        excersise: "",
        sets: [
          {
            id: id.current,
            parentId: id.current,
            weight: "",
            reps: "",
          },
        ],
      },
    ]);
  };

  const onChange = e => {
    const values = [...program];

    values[e.target.id].excersise = e.target.value;

    setProgramState(values);
  };

  const deleteExcersise = e => {
    const deletedValues = program.filter(
      (value, idx) => idx !== parseInt(e.target.id)
    );

    setProgramState(deletedValues);
  };

  return (
    <>
      {program.map((input, idx) => (
        <fieldset key={idx}>
          <label>Excersise </label>
          <input
            id={idx}
            type="text"
            value={input.excersise}
            onChange={onChange}
            name="excersise"
          />
          <SetsControls
            program={program}
            setProgramState={setProgramState}
            parentId={idx}
          />
          <Button id={idx} onClick={deleteExcersise}>
            Delete Excersise
          </Button>
        </fieldset>
      ))}

      <Button onClick={addExcersise}>Add new excersise</Button>
    </>
  );
};

export default ExcersiseControls;
