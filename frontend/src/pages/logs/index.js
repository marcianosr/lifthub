import React from "react";
import { useQuery } from "@apollo/react-hooks";
import Link from "next/link";

import gql from "graphql-tag";
// import { parsedLogs } from "../utils/index";
import Page from "../../layout/Page";
import Block from "../../layout/Block";

const LOGS_BY_USER_QUERY = gql`
  {
    user(where: { id: "ck0fbsbqdmq1k0b536of5ncwq" }) {
      name
      logs {
        id
        name
        excersise {
          name
        }
      }
    }
  }
`;

const Logs = () => {
  const { data, loading } = useQuery(LOGS_BY_USER_QUERY);

  return (
    <Page>
      {!loading ? (
        <Block title={`Logs overview from: ${data.user.name}`}>
          {data.user.logs.map(log => {
            console.log(log);
            return (
              <Link
                key={log.id}
                href={{
                  pathname: "/logs/[id]",
                }}
                as={`/logs/${log.id}`}
              >
                <a>{log.name}</a>
              </Link>
            );
          })}
        </Block>
      ) : (
        <span>Loading...</span>
      )}
    </Page>
  );
};

export default Logs;
