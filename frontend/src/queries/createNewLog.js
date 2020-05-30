import gql from "graphql-tag";

export const CREATE_NEW_LOG = gql`
  mutation CreateLog($data: LogCreateInput!) {
    createLog(data: $data) {
      name
      date
      excersises {
        name
        sets {
          id
          reps
          weight
        }
      }
    }
  }
`;
