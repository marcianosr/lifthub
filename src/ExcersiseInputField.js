import React, { useState, useReducer } from "react";

import SetInputField from "./SetInputField";
import Button from "./Button";
import SubElements from "./SubElements";

import { elementsReducer } from "./reducers/elementsReducer";
import { formValuesReducer } from "./reducers/formValuesReducer";

const ExcersiseInputField = ({ programState, setProgramState }) => {
  const [stateId, setStateId] = useState(1);

  const initialElements = {
    [0]: [
      {
        id: 0,
        element: "label",
        value: "Excersise",
        htmlFor: null,
      },
      {
        id: 0,
        element: "input",
        name: "excersise",
        type: "text",
      },
    ],
  };

  const initialFormValues = {
    id: 0,
    excersise: null,
    sets: [
      {
        id: 0,
        weight: null,
        reps: null,
      },
    ],
  };

  const [elements, dispatch] = useReducer(elementsReducer, initialElements);

  const [formValues, dispatchFormValues] = useReducer(
    formValuesReducer,
    initialFormValues
  );

  const addNewExcersise = e => {
    e.preventDefault();
    setStateId(stateId => stateId + 1);

    dispatch({
      type: "ADD_ELEMENT",
      id: stateId,
    });
  };

  const onChange = e => {
    dispatchFormValues({
      type: "CHANGE_EXCERSISE",
      id: parseInt(e.target.id),
      value: e.target.value,
    });
  };

  console.log(formValues);

  return (
    <>
      {Object.values(elements).map((list, idx) => {
        return (
          <fieldset key={idx}>
            {list.map((item, idx) => {
              const Component = item.element;

              if (item.element === "label") {
                return (
                  <Component key={idx} htmlFor={item.id}>
                    {item.value}
                  </Component>
                );
              } else if (item.element === "input") {
                return (
                  <>
                    <Component
                      key={idx}
                      id={item.id}
                      name={item.name}
                      type={item.type}
                      value={formValues.excersise || ""}
                      onChange={onChange}
                    />
                  </>
                );
              }
            })}
            <SubElements />
          </fieldset>
        );
      })}
      <Button type="submit" onClick={addNewExcersise}>
        Add new field
      </Button>
    </>
  );
};

export default ExcersiseInputField;
