import React, { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";

import ChildInputField from "./layout/ChildInputField";

const EditLog = ({ match }) => {
  const [logData, setLogData] = useState();
  const [value] = useLocalStorage(`training-${match.params.date}`);

  useEffect(() => {
    setLogData(value);
  });

  const mergeSetsToExcersise = (value, parentId) => {};

  console.log("logData", logData);
  return (
    <div>
      <h1>Edit log</h1>
      {logData && (
        <span>
          {logData.name} - {logData.date}
        </span>
      )}

      {logData &&
        logData.program.map((input, idx) => {
          console.log(input);

          return (
            <fieldset key={idx}>
              <label htmlFor={input.id}>{input.name}</label>
              <input
                type={input.type}
                id={input.id}
                name={input.name}
                onChange={e => {
                  onChange(e, idx);
                }}
                value={input.excersise || ""}
              />
              <ChildInputField
                parentId={input.id}
                mergeSetsToExcersise={mergeSetsToExcersise}
              />
            </fieldset>
          );
        })}
    </div>
  );
};

export default EditLog;
