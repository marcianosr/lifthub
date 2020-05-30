import gql from "graphql-tag";

export const deleteManySets = gql`
  mutation deleteMany($id: [ID!]) {
    deleteManySets(where: { id_in: $id }) {
      count
    }
  }
`;
