import gql from "graphql-tag";

export const upsertLog = gql`
  mutation UpsertLog(
    $createData: LogCreateInput!
    $updateData: LogUpdateInput!
    $id: ID!
  ) {
    upsertLog(create: $createData, update: $updateData, where: { id: $id }) {
      name
      date
      excersises {
        name
        sets {
          reps
          weight
        }
      }
    }
  }
`;
