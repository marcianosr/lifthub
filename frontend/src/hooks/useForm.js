import React from "react";
import { DateTime } from "luxon";
import { useMutation } from "@apollo/react-hooks";
import { createNewLog } from "../queries/createNewLog";
import { upsertLog } from "../queries/upsertLog";
import { deleteManyExcersises } from "../queries/deleteManyExcersises";
import { deleteManySets } from "../queries/deleteManySets";
// import { parsedLogs } from "../utils/index";

const useForm = (route, editedData) => {
  const [createNewLogMutation] = useMutation(createNewLog);
  const [upsertLogMutation] = useMutation(upsertLog);
  const [deleteManyExcersisesMutation] = useMutation(deleteManyExcersises);
  const [deleteManySetsMutation] = useMutation(deleteManySets);

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
