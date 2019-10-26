import { gql } from 'apollo-boost';

export const SUPER_CATEGORIES_QUERY = gql`
  query {
    superCategories {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export const SUPER_CATEGORY_QUERY = gql`
  query SuperCategory($id: ID!) {
    superCategory(id: $id) {
      id
      name
    }
  }
`;
