import { gql } from 'apollo-boost';

export const SIGNUP_MUTATION = gql`
  mutation UserCreate(
    $username: String!
    $password1: String!
    $password2: String!
  ) {
    userCreate(
      input: {
        username: $username
        password1: $password1
        password2: $password2
      }
    ) {
      clientMutationId
      errors {
        field
        messages
      }
      user {
        id
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    tokenCreate(username: $username, password: $password) {
      token
    }
  }
`;
