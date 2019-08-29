import React from "react";
import SetsControls from "./SetsControls";
import Button from "./Button";

const ExcersiseControls = ({ data, setData }) => {
  const id = React.useRef(0);
  const addExcersise = e => {
    id.current++;
    setData({
      ...data,
      program: [
        ...data.program,
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
      ],
    });
  };

  const onChange = e => {
    const values = [...data.program];

    values[e.target.id].excersise = e.target.value;

    setData({
      ...data,
      program: values,
    });
  };

  const deleteExcersise = e => {
    const deletedValues = data.program.filter(
      (value, idx) => idx !== parseInt(e.target.id)
    );

    setData({
      ...data,
      program: deletedValues,
    });
  };

  return (
    <>
      {data.program.map((input, idx) => (
        <fieldset key={idx}>
          <label>Excersise </label>
          <input
            id={idx}
            type="text"
            value={input.excersise}
            onChange={onChange}
            name="excersise"
          />
          <SetsControls data={data} setData={setData} parentId={idx} />
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
