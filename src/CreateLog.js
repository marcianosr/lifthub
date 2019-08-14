import React, { useState, useEffect } from "react";
import { useLocalStorage } from "react-use";
import { DateTime } from "luxon";

import Page from "./layout/Page";
import Button from "./layout/Button";
import ExcersiseControls from "./layout/ExcersiseControls";

const CreateLog = () => {
  const [program, setProgramState] = useState([
    {
      id: 0,
      excersise: "",
      sets: [
        {
          id: 0,
          parentId: 0,
          weight: "",
          reps: "",
        },
      ],
    },
  ]);

  console.log("program", Object.values(program));

  return (
    <Page>
      <h1>Create log</h1>
      <form className="create-log-form">
        {/* <fieldset>
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
        </fieldset> */}

        <ExcersiseControls
          program={program}
          setProgramState={setProgramState}
        />
        {/* 
        <Button type="button" onClick={onSubmit}>
          Submit
        </Button> */}
      </form>
    </Page>
  );
};

export default CreateLog;
