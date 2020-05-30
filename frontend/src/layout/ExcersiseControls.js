import React from "react";
import SetsControls from "./SetsControls";
import Button from "./Button";

const ExcersiseControls = ({
  data,
  setData,
  deletedExcersiseIds,
  setDeletedExcersiseIds,
  deletedSetIds,
  setDeletedSetIds,
}) => {
  const id = React.useRef(0);
  const addExcersise = () => {
    id.current++;

    setData({
      ...data,
      excersises: [
        ...data.excersises,
        {
          id: id.current,
          name: "",
          sets: [
            {
              id: id.current,
              parentId: id.current,
              weight: 0,
              reps: 0,
            },
          ],
        },
      ],
    });
  };

  const onChange = e => {
    const values = [...data.excersises];

    values[e.target.id].name = e.target.value;

    setData({
      ...data,
      excersises: values,
    });
  };

  const deleteExcersise = e => {
    const excersises = data.excersises.filter(
      (value, idx) => idx !== parseInt(e.target.id)
    );

    setData({
      ...data,
      excersises,
    });
  };

  return (
    <>
      {data.excersises.map((input, idx) => (
        <fieldset key={idx}>
          <label>Excersise - {input.id}</label>
          <input
            id={idx}
            type="text"
            value={input.name}
            onChange={onChange}
            name="excersise"
          />
          <SetsControls
            data={data}
            setData={setData}
            parentId={idx}
            deletedSetIds={deletedSetIds}
            setDeletedSetIds={setDeletedSetIds}
          />
          <Button
            id={idx}
            onClick={e => {
              deleteExcersise(e);
              setDeletedExcersiseIds([...deletedExcersiseIds, input.id]);
            }}
          >
            Delete Excersise
          </Button>
        </fieldset>
      ))}

      <Button onClick={addExcersise}>Add new excersise</Button>
    </>
  );
};

export default ExcersiseControls;
