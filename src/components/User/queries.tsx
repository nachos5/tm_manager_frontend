import { gql } from 'apollo-boost';

export const USER_QUERY = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      username
      email
      name
    }
  }
`;

export const USER_TOURNAMENT = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      username
      tournaments {
        edges {
          node {
            id
            name
            category {
              name
            }
          }
        }
      }
      createdTournaments {
        edges {
          node {
            id
            name
            category {
              name
            }
          }
        }
      }
    }
  }
`;
