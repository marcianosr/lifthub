import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import useForm from "../../../hooks/useForm";

import ExcersiseControls from "../../../layout/ExcersiseControls";
import Button from "../../../layout/Button";

// Get current log data to edit.
const LOG_QUERY = gql`
  query editLog($id: ID!) {
    log(id: $id) {
      id
      name
      date
      excersises {
        id
        name
        sets {
          id
          reps
          weight
        }
      }
    }
  }
`;

const Edit = () => {
  const router = useRouter();

  const { data, loading } = useQuery(LOG_QUERY, {
    variables: { id: router.query.id },
  });

  const [
    formData,
    setData,
    onChange,
    onSubmit,
    disabled,
    deletedExcersiseIds,
    setDeletedExcersiseIds,
    deletedSetIds,
    setDeletedSetIds,
  ] = useForm("Edit", data && data.log);

  // If the data has been loaded don't show it yet to the frontend
  // but merge it with the state formData variable

  return (
    <form className="edit-log-form">
      <fieldset>
        <label htmlFor="training-name">Training name</label>
        <input
          type="text"
          id="training-name"
          name="training-name"
          onChange={onChange}
          value={formData && formData.name}
        />
        <label htmlFor="date">Date</label>
        <input
          type="date"
          name="date"
          id="date"
          // TODO
          // value={formData && formData.date}
          onChange={onChange}
        />
      </fieldset>

      {formData && (
        <ExcersiseControls
          data={formData}
          setData={setData}
          deletedExcersiseIds={deletedExcersiseIds}
          setDeletedExcersiseIds={setDeletedExcersiseIds}
          deletedSetIds={deletedSetIds}
          setDeletedSetIds={setDeletedSetIds}
        />
      )}

      <Button onClick={onSubmit}>Submit</Button>
    </form>
  );
};

export default Edit;
