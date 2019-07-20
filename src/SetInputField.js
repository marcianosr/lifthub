import React, { useState, useEffect } from "react";
import Button from "./Button";

const SetInputField = ({ parentId, mergeSetsToExcersise }) => {
  const [stateChildrenId, setStateChildrenId] = useState(1);

  const [childrenInputFields, setChildrenInputFields] = useState([
    { id: 0, name: "weight", type: "number" },
    { id: 0, name: "reps", type: "number" },
  ]);

  const [childrenInputValue, setChildrenInputValue] = useState({});

  const addNewSet = e => {
    e.preventDefault();
    setStateChildrenId(stateChildrenId => stateChildrenId + 1);

    setChildrenInputFields([
      ...childrenInputFields,
      {
        id: stateChildrenId,
        name: "weight",
        type: "number",
      },
      {
        id: stateChildrenId,
        name: "reps",
        type: "number",
      },
    ]);
  };

  const onChange = e => {
    setChildrenInputValue({
      ...childrenInputValue,
      [e.target.id]: {
        ...childrenInputValue[e.target.id],
        parentId,
        id: parseInt(e.target.id),
        [e.target.name]: e.target.value,
      },
    });
  };

  useEffect(() => {
    mergeSetsToExcersise(childrenInputValue, parentId);
  }, [childrenInputValue]);

  return (
    <>
      {childrenInputFields.map((input, idx) => {
        return (
          <div key={idx}>
            <label htmlFor={input.name}>{input.name}</label>
            <input
              type={input.type}
              id={input.id}
              name={input.name}
              onChange={onChange}
              value={
                (childrenInputValue[input.id] &&
                  childrenInputValue[input.id][input.name]) ||
                ""
              }
            />
          </div>
        );
      })}
      <Button
        type="submit"
        onClick={e => {
          addNewSet(e);
        }}
      >
        Add new set
      </Button>
    </>
  );
};

export default SetInputField;
