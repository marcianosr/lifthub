import gql from "graphql-tag";

export const deleteManyExcersises = gql`
  mutation deleteMany($id: [ID!]) {
    deleteManyExcersises(where: { id_in: $id }) {
      count
    }
  }
`;
