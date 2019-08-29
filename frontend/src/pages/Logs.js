import React from "react";
import { Link } from "react-router-dom";

// import { parsedLogs } from "../utils/index";
import Block from "../layout/Block";

const Logs = () => {
  const [logs, setLogs] = React.useState();

  // React.useEffect(() => {
  //   setLogs(parsedLogs);
  // }, [logs, setLogs]);

  return (
    <Block title="Logs overview">
      {logs &&
        logs.map((log, i) => {
          return (
            <Block key={i}>
              <Link to={`log/${log.date}`}>
                <h1>{log.name}</h1>
              </Link>

              <time>{log.date}</time>
              <div>
                <Link to={`edit/${log.date}`}>Edit log</Link>
              </div>
            </Block>
          );
        })}
    </Block>
  );
};

export default Logs;
