import React from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/react-hooks";
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

  //   TODO: Mutation doesn't update in DB?!

  const { data, loading } = useQuery(LOG_QUERY, {
    variables: { id: router.query.id },
  });

  const [formData, setData, onChange, onSubmit] = useForm("Edit", data);

  console.log("Form", formData);

  return (
    <form className="edit-log-form">
      <fieldset>
        <label htmlFor="training-name">Training name</label>
        <input
          type="text"
          id="training-name"
          name="training-name"
          onChange={onChange}
          value={data && data.log.name}
        />
        <label htmlFor="date">Date</label>
        <input
          type="date"
          name="date"
          id="date"
          //   value={data && data.date}
          onChange={onChange}
        />
      </fieldset>

      {data && <ExcersiseControls data={data.log} setData={setData} />}

      <Button onClick={onSubmit}>Submit</Button>
    </form>
  );
};

export default Edit;
