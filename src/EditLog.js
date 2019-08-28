import React from "react";

import useForm from "./hooks/useForm";

import ExcersiseControls from "./layout/ExcersiseControls";
import Button from "./layout/Button";

const EditLog = ({ match }) => {
  const [data, setData, onChange, onSubmit] = useForm(match.params.date);

  return (
    <form className="edit-log-form">
      <fieldset>
        <label htmlFor="training-name">Training name</label>
        <input
          type="text"
          id="training-name"
          name="training-name"
          onChange={onChange}
          value={data.name}
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

      <Button onClick={onSubmit}>Submit</Button>
    </form>
  );
};

export default EditLog;
