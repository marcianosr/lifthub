import React from "react";

import useForm from "../hooks/useForm";

import Page from "../layout/Page";
import Button from "../layout/Button";
import ExcersiseControls from "../layout/ExcersiseControls";

const CreateLog = () => {
  const [data, setData, onChange, onSubmit, disabled] = useForm();

  return (
    <Page>
      {data.excersises.map(value => {
        return (
          <>
            <h2>{value.excersise}</h2>
            {value.sets.map((v, idx) => {
              return (
                <p key={idx}>
                  {v.id} - {v.weight} - {v.reps}
                </p>
              );
            })}
          </>
        );
      })}
      <h1>Create log</h1>

      <form className="create-log-form">
        <fieldset>
          <label htmlFor="training-name">Training name</label>
          <input
            type="text"
            id="training-name"
            name="training-name"
            onChange={onChange}
            value={data.name || "Training"}
          />
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            value={data.date.split("training-")[1]}
            onChange={onChange}
          />
        </fieldset>

        <ExcersiseControls data={data} setData={setData} />

        <Button onClick={onSubmit} disabled={disabled}>
          Submit
        </Button>
        {disabled && (
          <span>Warning: This date already contains a trainingslog.</span>
        )}
      </form>
    </Page>
  );
};

export default CreateLog;
