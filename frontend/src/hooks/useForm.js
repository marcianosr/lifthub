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

const UPSERT_LOG = gql`
  mutation UpsertLog(
    $createData: LogCreateInput!
    $updateData: LogUpdateInput!
    $id: ID!
  ) {
    upsertLog(create: $createData, update: $updateData, where: { id: $id }) {
      name
      date
      excersises {
        name
        sets {
          reps
          weight
        }
      }
    }
  }
`;

const DELETE_MANY_EXCERSISES = gql`
  mutation deleteMany($id: [ID!]) {
    deleteManyExcersises(where: { id_in: $id }) {
      count
    }
  }
`;

const DELETE_MANY_SETS = gql`
  mutation deleteMany($id: [ID!]) {
    deleteManySets(where: { id_in: $id }) {
      count
    }
  }
`;

const useForm = (route, editedData) => {
  const [createNewLogMutation] = useMutation(CREATE_NEW_LOG);
  const [upsertLogMutation] = useMutation(UPSERT_LOG);
  const [deleteManyExcersisesMutation] = useMutation(DELETE_MANY_EXCERSISES);
  const [deleteManySetsMutation] = useMutation(DELETE_MANY_SETS);

  const date = DateTime.local(); // get today's date
  const [disabled, setDisabled] = React.useState(false);
  const [deletedExcersiseIds, setDeletedExcersiseIds] = React.useState([]);
  const [deletedSetIds, setDeletedSetIds] = React.useState([]);

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
    console.log("submit");
    // console.log("LogData", logData);

    if (editedData) {
      console.log("Upsert");
      // console.log(logData);

      // return;
      // Delete fields: Save ID's to be deleted and put those

      if (deletedSetIds.length > 0) {
        deleteManySetsMutation({
          variables: {
            id: Object.values(deletedSetIds),
          },
        });
      }

      if (deletedExcersiseIds.length > 0) {
        deleteManyExcersisesMutation({
          variables: {
            id: Object.values(deletedExcersiseIds),
          },
        });
      }

      upsertLogMutation({
        variables: {
          id: logData.id,
          updateData: {
            date: logData.date,
            name: logData.name,
            excersises: {
              upsert: logData.excersises.map(excersise => ({
                where: { id: excersise.id },
                update: {
                  name: excersise.name,
                  sets: {
                    upsert: excersise.sets.map(sets => ({
                      where: { id: sets.id },
                      update: {
                        weight: sets.weight,
                        reps: sets.reps,
                      },
                      create: {
                        weight: sets.weight,
                        reps: sets.reps,
                      },
                    })),
                  },
                },
                create: {
                  name: excersise.name,
                  sets: {
                    create: excersise.sets.map(sets => ({
                      weight: sets.weight,
                      reps: sets.reps,
                    })),
                  },
                },
              })),
            },
          },
          createData: {
            name: logData.name,
            date: logData.date,
            excersises: {
              create: logData.excersises.map(excersise => ({
                name: excersise.name,
                sets: {
                  create: excersise.sets.map(sets => ({
                    weight: sets.weight,
                    reps: sets.reps,
                  })),
                },
              })),
            },
          },
        },
      });
    } else {
      console.log("Create");
      // Create a brand new log
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
    }

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
    if (editedData) {
      setLogData(editedData);
    }
  }, [editedData]);

  return [
    logData,
    setLogData,
    onChange,
    onSubmit,
    disabled,
    deletedExcersiseIds,
    setDeletedExcersiseIds,
    deletedSetIds,
    setDeletedSetIds,
  ];
};

export default useForm;
