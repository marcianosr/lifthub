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
        excersises {
          name
        }
      }
    }
  }
`;

const Logs = () => {
  const { data, loading } = useQuery(LOGS_BY_USER_QUERY);

  console.log(data);

  return (
    <Page>
      {!loading ? (
        <Block title={`Logs overview from: ${data.user.name}`}>
          <ul>
            {data.user.logs.map(log => {
              return (
                <li key={log.id}>
                  <Link
                    href={{
                      pathname: "/log/[id]",
                    }}
                    as={`/log/${log.id}`}
                  >
                    <a>{log.name}</a>
                  </Link>
                  <br />
                  <span>---</span>
                  <Link
                    href={{
                      pathname: `log/${log.id}/edit`,
                    }}
                  >
                    Edit
                  </Link>
                </li>
              );
            })}
          </ul>
        </Block>
      ) : (
        <span>Loading...</span>
      )}
    </Page>
  );
};

export default Logs;
