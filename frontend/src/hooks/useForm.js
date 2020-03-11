import React from "react";
import { DateTime } from "luxon";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

// import { parsedLogs } from "../utils/index";

const CREATE_NEW_LOG = gql`
  mutation CreateLog($data: LogCreateInput!) {
    createLog(data: $data) {
      name
      date
      excersises {
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

const useForm = (route, editedData) => {
  // const [createNewLogMutation, { data }] = useMutation(CREATE_NEW_LOG);

  const date = DateTime.local(); // get today's date
  const [disabled, setDisabled] = React.useState(false);

  const [logData, setLogData] = React.useState({
    name: "Training",
    date: date.toISODate(),
    excersises: [
      {
        id: 0,
        name: "",
        sets: [
          {
            id: 0,
            parentId: 0,
            weight: 0,
            reps: 0,
          },
        ],
      },
    ],
  });

  const [logs, setLogs] = React.useState();

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onChange = e => {
    if (e.target.type === "date") {
      setLogData({
        ...logData,
        date: e.target.value,
      });
      return;
    }
    if (e.target.name === "training-name") {
      setLogData({ ...logData, name: e.target.value });
      return;
    }
  };

  const onSubmit = e => {
    setIsSubmitting(true);

    console.log("logData");

    return;
    createNewLogMutation({
      variables: {
        data: {
          name: logData.name,
          date: new Date(logData.date).toISOString(),
          excersises: {
            create: [
              ...logData.excersises.map(excersise => ({
                name: excersise.name,
                sets: {
                  create: excersise.sets.map(sets => ({
                    weight: sets.weight,
                    reps: sets.reps,
                  })),
                },
              })),
            ],
          },
        },
      },
    });

    console.log("fire mutation");
  };

  // Check if there is already a log on this date to prevent overriding
  // React.useEffect(() => {
  // setLogs(parsedLogs);
  // const date = parsedLogs.find(log => log.date === logData.date);
  // if (date) {
  //   setDisabled(true);
  // } else {
  //   setDisabled(false);
  // }
  // }, [logs, logData.date]);
  // When the form is processed, it doesn't capture the correct state because the component hasn't been re-rendered yet.
  React.useEffect(() => {
    if (isSubmitting) {
      // localStorage.setItem(logData.date, JSON.stringify(logData));

      // create <mutation!></mutation!>
      setIsSubmitting(false);
    }
  }, [isSubmitting, logData]);

  React.useEffect(() => {
    if (route) {
      // const item = JSON.parse(localStorage.getItem(`${route}`));
      // setLogData(item);
      // setLogData(data);
    }
  }, [route]);

  React.useEffect(() => {
    if (editedData) {
      setLogData(editedData);
    }
  }, [editedData]);

  return [logData, setLogData, onChange, onSubmit, disabled];
};

export default useForm;
