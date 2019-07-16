import React, { useState, useEffect } from "react";
import { useLocalStorage } from "react-use";
import { DateTime } from "luxon";

import Page from "./layout/Page";
import Button from "./Button";
import ChildInputField from "./layout/ChildInputField";

const CreateLog = () => {
  const date = DateTime.local(); // get today's date

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ids
  const [stateId, setStateId] = useState(1);
  // Values
  const [inputValue, setInputValue] = useState({
    [0]: {
      id: 0,
      excersise: "",
    },
  });

  const [programState, setProgramState] = useState({
    ...inputValue,
    [0]: {
      ...inputValue[0],
      sets: [
        {
          id: 0,
          parentId: 0,
          weight: 0,
          reps: 0,
        },
      ],
    },
  });

  const [trainingData, setTrainingData] = useState({
    name: "Training",
    date: `${date.day}-${date.month}-${date.year}`,
    program: [],
  });

  //  Fields
  const [inputFields, setInputFieldsState] = useState({
    fields: [
      {
        id: 0,
        name: "excersise",
        type: "text",
      },
    ],
  });

  const [item, setItem] = useLocalStorage(`training-${trainingData.date}`);

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

  const onSubmit = e => {
    e.preventDefault();
    setIsSubmitting(true);
    setTrainingData({
      ...trainingData,
      program: [...Object.values(programState)],
    });
  };

  useEffect(() => {
    if (isSubmitting) {
      setItem(trainingData);
    }

    setIsSubmitting(false);
  }, [onSubmit]);

  return (
    <Page>
      <ul>
        {Object.values(programState).map((program, idx) => {
          return (
            <li key={idx}>
              {program.id} - excersise: {program.excersise}
              <ul>
                {program.sets.map((set, idx) => {
                  return (
                    <li key={idx}>
                      {set.id} - weight: {set.weight} - reps: {set.reps}
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>

      <h1>Create log {stateId}</h1>
      <form className="create-log-form">
        <fieldset>
          <label htmlFor="training-name">Training name</label>
          <input
            type="text"
            id="training-name"
            name="training-name"
            onChange={onChange}
          />
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            // min="2018-01-01"
            onChange={onChange}
          />
        </fieldset>

        <>
          {inputFields.fields.map((input, idx) => {
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
          })}
        </>
        <Button
          type="submit"
          onClick={e => {
            addField(e);
          }}
        >
          Add new field
        </Button>
        <Button type="button" onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </Page>
  );
};

export default CreateLog;
