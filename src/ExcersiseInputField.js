import React, { useState, useEffect } from "react";

import ChildInputField from "./layout/ChildInputField";

const ExcersiseInputField = () => {
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

  const onChange = e => {
    if (e.target.type === "date") {
      const date = DateTime.fromISO(e.target.value);

      setTrainingData({
        ...trainingData,
        date: `${date.day}-${date.month}-${date.year}`,
      });
      return;
    }

    if (e.target.name === "training-name") {
      setTrainingData({ ...trainingData, name: e.target.value });
      return;
    }

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
          <ChildInputField
            parentId={input.id}
            mergeSetsToExcersise={mergeSetsToExcersise}
          />
        </div>
      </fieldset>
    );
  });
};

export default ExcersiseInputField;
