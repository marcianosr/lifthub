import React, { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";

import Button from "./Button";
import { strict } from "assert";

const EditLog = ({ match }) => {
  const [logData, setLogData] = useState();
  const [value] = useLocalStorage(`training-${match.params.date}`);
  const [stateId, setStateId] = useState();

  useEffect(() => {
    setLogData(value);
    setStateId(value.program.length);
  }, [value]);

  const onChange = e => {
    setLogData({
      ...logData,
      program: [
        ...logData.program.map(item =>
          item.id === parseInt(e.target.id)
            ? { ...item, excersise: e.target.value }
            : item
        ),
      ],
    });
  };

  const onChangeSets = (e, parentId) => {
    setLogData({
      ...logData,
      program: [
        ...logData.program.map(item =>
          item.id === parseInt(parentId)
            ? {
                ...item,
                sets: [
                  ...logData.program[parentId].sets.map(set =>
                    set.parentId === parentId &&
                    set.id === parseInt(e.target.id)
                      ? { ...set, [e.target.name]: e.target.value }
                      : set
                  ),
                ],
              }
            : item
        ),
      ],
    });
  };

  const addField = e => {
    e.preventDefault();
    setLogData({
      ...logData,
      program: [
        ...logData.program,
        {
          id: stateId,
          excersise: "",
          sets: [
            {
              parentId: stateId,
              id: 0,
              weight: "",
              reps: "",
            },
          ],
        },
      ],
    });

    setStateId(stateId + 1);
  };

  const addSet = (e, parentId, id) => {
    e.preventDefault();
    setLogData({
      ...logData,
      program: [
        ...logData.program.map(item =>
          item.id === parseInt(parentId)
            ? {
                ...item,
                sets: [
                  ...item.sets,
                  {
                    parentId: parentId,
                    id,
                    weight: "",
                    reps: "",
                  },
                ],
              }
            : item
        ),
      ],
    });
  };

  return (
    <div>
      <h1>Edit log</h1>
      {logData && (
        <span>
          {logData.name} - {logData.date}
        </span>
      )}

      <form>
        {logData &&
          logData.program.map((input, parentId) => {
            return (
              <fieldset key={parentId}>
                <label htmlFor={input.id}>Excersise</label>
                <input
                  type={input.type}
                  id={input.id}
                  name={input.name}
                  onChange={e => {
                    onChange(e, parentId);
                  }}
                  value={input.excersise}
                />
                {input.sets &&
                  input.sets.map((set, idx) => {
                    return (
                      <fieldset key={idx}>
                        <div>
                          <label htmlFor={set.id}>Weight</label>
                          <input
                            type="number"
                            id={set.id}
                            name="weight"
                            onChange={e => {
                              onChangeSets(e, parentId);
                            }}
                            value={set.weight || ""}
                          />
                        </div>
                        <div>
                          <label htmlFor={set.id}>Reps</label>
                          <input
                            type="number"
                            id={set.id}
                            name="reps"
                            onChange={e => {
                              onChangeSets(e, parentId);
                            }}
                            value={set.reps || ""}
                          />
                        </div>
                      </fieldset>
                    );
                  })}
                <Button
                  type="submit"
                  onClick={e => {
                    addSet(e, parentId, input.sets.length);
                  }}
                >
                  Add new set
                </Button>
              </fieldset>
            );
          })}
        <Button
          type="submit"
          onClick={e => {
            addField(e);
          }}
        >
          Add new field
        </Button>
      </form>
    </div>
  );
};

export default EditLog;
