import React, { useState } from "react";

import SetInputField from "./SetInputField";
import Button from "./Button";

const ExcersiseInputField = ({ programState, setProgramState }) => {
  const [stateId, setStateId] = useState(1);

  console.log("//", programState);

  const [inputFields, setInputFieldsState] = useState({
    fields: [
      {
        id: 0,
        name: "excersise",
        type: "text",
      },
    ],
  });

  const [inputValue, setInputValue] = useState({
    [0]: {
      id: 0,
      excersise: "",
    },
  });

  const addField = e => {
    e.preventDefault();
    setStateId(stateId => stateId + 1);

    setInputFieldsState({
      ...inputFields,
      fields: [
        ...inputFields.fields,
        {
          id: stateId,
          name: "excersise",
          type: "text",
        },
      ],
    });
  };

  const onChange = e => {
    setInputValue({
      ...inputValue,
      [e.target.id]: {
        id: parseInt(e.target.id),
        [e.target.name]: e.target.value || "",
      },
    });
  };

  const mergeSetsToExcersise = (value, parentId) => {
    const sets = Object.values(value);
    const inputValue2 = Object.values(inputValue);
    if (sets.length !== 0) {
      setProgramState({
        ...programState,
        [parentId]: {
          ...inputValue2[parentId],
          sets: [...sets],
        },
      });
    }
  };

  return inputFields.fields.map((input, idx) => {
    return (
      <fieldset key={idx}>
        <div key={idx}>
          <label htmlFor={input.id}>{input.name}</label>
          <input
            type={input.type}
            id={input.id}
            name={input.name}
            onChange={e => {
              onChange(e, idx);
            }}
            value={(inputValue[idx] && inputValue[idx].excersise) || ""}
          />
          <SetInputField
            parentId={input.id}
            mergeSetsToExcersise={mergeSetsToExcersise}
          />
        </div>
        <Button
          type="submit"
          onClick={e => {
            addField(e);
          }}
        >
          Add new field
        </Button>
      </fieldset>
    );
  });
};

export default ExcersiseInputField;
