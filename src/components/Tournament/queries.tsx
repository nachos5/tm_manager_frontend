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
      matchBracket
      userIsRegistered
      location
      date
      time
      canEdit
      code
    }
  }
`;

export const PUBLIC_TOURNAMENTS_LIST = gql`
  query Tournaments(
    $first: Int
    $after: String
    $superCategory: Float
    $name: String
    $statuses: String
    $categories: String
  ) {
    tournaments(
      first: $first
      after: $after
      superCategory: $superCategory
      name_Icontains: $name
      status_In: $statuses
      category_Name_In: $categories
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

export const TOURNAMENT_STATUSES_QUERY = gql`
  query {
    tournamentStatuses
  }
`;

export const TOGGLE_USER_TOURNAMENT_MUTATION = gql`
  mutation Toggle($id: ID!) {
    tournamentToggleRegisteredUser(input: { id: $id }) {
      clientMutationId
      tournament {
        registeredUsers {
          edges {
            node {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const TOURNAMENT_CREATE_MUTATION = gql`
  mutation TournamentCreate($input: TournamentCreateMutationInput!) {
    tournamentCreate(input: $input) {
      clientMutationId
      errors {
        field
        messages
      }
      tournament {
        id
        name
        category {
          superCategory {
            id
          }
        }
      }
    }
  }
`;

export const TOURNAMENT_SEED_BRACKET_MUTATION = gql`
  mutation SeedBracket($id: ID!) {
    tournamentCreateInitialMatchups(input: { id: $id }) {
      clientMutationId
    }
  }
`;

export const MATCH_COMPLETE_MUTATION = gql`
  mutation MatchComplete($input: MatchCompleteMutationInput!) {
    matchComplete(input: $input) {
      clientMutationId
      match {
        id
        winner {
          id
          username
        }
      }
    }
  }
`;

export const TOURNAMENT_CHECK_USERS = gql`
  query Tournament($id: ID) {
    tournament(id: $id) {
      id
      creator {
        id
      }
      registeredUsers {
        edges {
          node {
            id
            name
            username
          }
        }
      }
      admins {
        edges {
          node {
            id
            name
            username
          }
        }
      }
    }
  }
`;
