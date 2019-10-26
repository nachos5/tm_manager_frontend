import { gql } from 'apollo-boost';

export const TOURNAMENT_QUERY = gql`
  query Tournament($id: ID) {
    tournament(id: $id) {
      id
      name
      creator {
        id
        username
      }
      admins {
        edges {
          node {
            id
            username
          }
        }
      }
      lastModified
      category {
        id
        name
      }
      registeredUsers {
        edges {
          node {
            id
            username
          }
        }
      }
      private
      statusDisplay
    }
  }
`;

export const PUBLIC_TOURNAMENTS_LIST = gql`
  query Tournaments(
    $first: Int
    $after: String
    $superCategory: Float
    $name: String
  ) {
    tournaments(
      first: $first
      after: $after
      superCategory: $superCategory
      name_Icontains: $name
    ) {
      pageInfo {
        endCursor
      }
      totalCount
      edges {
        node {
          id
          name
          category {
            id
            name
          }
          registeredUsers {
            totalCount
          }
          slots
          status
          statusDisplay
          private
          creator {
            id
            username
          }
        }
      }
    }
  }
`;
