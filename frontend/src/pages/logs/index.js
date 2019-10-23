import React from "react";
import { useQuery } from "@apollo/react-hooks";
import Link from "next/link";

import gql from "graphql-tag";
// import { parsedLogs } from "../utils/index";
import Page from "../../layout/Page";
import Block from "../../layout/Block";

const logsQuery = gql`
  {
    logs {
      id
      name
      date
    }
  }
`;

const Logs = props => {
  const { data, loading } = useQuery(logsQuery);
  console.log(data);

  return (
    <Page>
      <Block title="Logs overview">
        {data &&
          data.logs.map(log => (
            <Link key={log.id} href={`/logs/[id]`} as={`/logs/${log.id}`}>
              <a>{log.name}</a>
            </Link>
          ))}
      </Block>
    </Page>
  );
};

export default Logs;
