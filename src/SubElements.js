import React, { useState, useReducer } from "react";

import { subElementsReducer } from "./reducers/elementsReducer";
import { formValuesReducer } from "./reducers/formValuesReducer";

import Button from "./Button";

const SubElements = () => {
  const [stateSubId, setStateSubId] = useState(1);

  const initialSubElements = {
    [0]: [
      {
        id: 0,
        element: "label",
        value: "Weight",
        htmlFor: null,
      },
      {
        id: 0,
        element: "input",
        name: "weight",
        type: "number",
        value: "",
      },
      {
        id: 0,
        element: "label",
        value: "Reps",
        htmlFor: null,
      },
      {
        id: 0,
        element: "input",
        name: "reps",
        type: "number",
        value: "",
      },
    ],
  };

  const [subElements, dispatch] = useReducer(
    subElementsReducer,
    initialSubElements
  );

  const addNewSet = e => {
    e.preventDefault();
    setStateSubId(stateSubId => stateSubId + 1);

    dispatch({
      type: "ADD_SUB_ELEMENT",
      id: stateSubId,
    });
  };

  return (
    <>
      <Button onClick={addNewSet}>Add new set</Button>

      {Object.values(subElements).map((list, idx) => {
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
                      value={item.value}
                    />
                  </>
                );
              }
            })}
          </fieldset>
        );
      })}
    </>
  );
};

export default SubElements;
