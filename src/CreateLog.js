import React, { useState, useEffect } from "react";
import { useLocalStorage } from "react-use";
import { DateTime } from "luxon";

import Page from "./layout/Page";
import Button from "./Button";
import ExcersiseInputField from "./ExcersiseInputField";

const CreateLog = () => {
  const date = DateTime.local(); // get today's date

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [programState, setProgramState] = useState({
    [0]: {
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

  const [item, setItem] = useLocalStorage(`training-${trainingData.date}`);

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
                  if (set) {
                    return (
                      <li key={idx}>
                        {set.id} - weight: {set.weight} - reps: {set.reps}
                      </li>
                    );
                  } else {
                    return null;
                  }
                })}
              </ul>
            </li>
          );
        })}
      </ul>

      <h1>Create log</h1>
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

        <ExcersiseInputField
          programState={programState}
          setProgramState={setProgramState}
        />

        <Button type="button" onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </Page>
  );
};

export default CreateLog;
