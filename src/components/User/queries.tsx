import { gql } from 'apollo-boost';

export const USER_QUERY = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      username
      email
      name
      matchesWonCount
      tournamentsWonCount
    }
  }
`;
