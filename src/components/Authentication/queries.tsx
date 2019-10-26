import { gql } from 'apollo-boost';

export const ME_QUERY = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const USER_JWT_QUERY = gql`
  query UserJWT($token: String!) {
    userJwt(token: $token) {
      username
    }
  }
`;
