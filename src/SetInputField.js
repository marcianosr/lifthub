import React, { useState, useEffect } from "react";
import Button from "./Button";

const SetInputField = ({ parentId, mergeSetsToExcersise }) => {
  const [stateChildrenId, setStateChildrenId] = useState(1);

  // const [childrenInputValue, setChildrenInputValue] = useState([]);
  const [childrenInputValue, setChildrenInputValue] = useState({});

  const [childrenInputFields, setChildrenInputFields] = useState([
    {
      id: 0,
      name: "weight",
      element: "label",
      htmlFor: "weight",
    },
    {
      id: 0,
      type: "number",
      name: "weight",
      element: "input",
    },
    {
      id: 0,
      name: "reps",
      element: "label",
      htmlFor: "reps",
    },
    {
      id: 0,
      type: "number",
      name: "reps",
      element: "input",
    },
    {
      id: 0,
      name: "button",
      element: "button",
      value: "Delete set",
    },
  ]);

  const addNewSet = e => {
    e.preventDefault();
    setStateChildrenId(stateChildrenId => stateChildrenId + 1);

    setChildrenInputFields([
      ...childrenInputFields,
      {
        id: stateChildrenId,
        name: "weight",
        element: "label",
        htmlFor: "weight",
      },
      {
        id: stateChildrenId,
        type: "number",
        name: "weight",
        element: "input",
      },
      {
        id: stateChildrenId,
        name: "reps",
        element: "label",
        htmlFor: "reps",
      },
      {
        id: stateChildrenId,
        type: "number",
        name: "reps",
        element: "input",
      },
      {
        id: stateChildrenId,
        name: "Button",
        element: "button",
        value: "Delete set",
      },
    ]);

    setChildrenInputValue({
      ...childrenInputValue,
      [stateChildrenId]: null,
    });
  };

  const onChange = e => {
    setChildrenInputValue({
      ...childrenInputValue,
      [e.target.id]: {
        ...childrenInputValue[e.target.id],
        parentId,
        id: parseInt(e.target.id),
        [e.target.name]: e.target.value,
      },
    });
  };

  const deleteSet = e => {
    e.preventDefault();

    const inputFields = [...childrenInputFields];

    const deletedFields = inputFields.filter(value => {
      return value.id !== parseInt(e.target.id);
    });
    const deletedValues = Object.values(childrenInputValue).map(
      value => value && value.id !== parseInt(e.target.id) && { ...value }
    );

    setChildrenInputFields(deletedFields);
    setChildrenInputValue(deletedValues);
  };

  useEffect(() => {
    // dispatch action
    mergeSetsToExcersise(childrenInputValue, parentId);
  }, [childrenInputValue]);

  return (
    <>
      {childrenInputFields.map((input, idx) => {
        const { element, value, name, ...rest } = input;

        const Component = element;
        if (element === "input") {
          return (
            <div key={idx}>
              {input.id}
              <Component
                onChange={onChange}
                value={
                  (childrenInputValue[input.id] &&
                    childrenInputValue[input.id][name]) ||
                  ""
                }
                name={name}
                {...rest}
              />
            </div>
          );
        }

        if (element === "label") {
          return (
            <Component key={idx} htmlFor={name} {...rest}>
              {name}
            </Component>
          );
        }

        if (element === "button") {
          return (
            <div key={idx}>
              <Button
                onClick={e => {
                  deleteSet(e, input.id);
                }}
                value={value}
                {...rest}
              >
                {value}
              </Button>
            </div>
          );
        }
      })}
      <Button
        type="submit"
        onClick={e => {
          addNewSet(e);
        }}
      >
        Add new set
      </Button>
    </>
  );
};

export default SetInputField;
