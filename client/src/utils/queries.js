import { gql } from '@apollo/client';

export const QUERY_ENTREE = gql`
  query entrees {
  entrees {
    allergy
    description
    image
    in_stock
    name
    price
    _id
  }
}
`;

export const QUERY_SINGLE_ENTREE = gql`
  query singleEntree($entreeId: ID!) {
  entree(entreeId: $entreeId) {
    _id
    name
    description
    price
    in_stock
    allergy
    image
  }
}
`;

export const QUERY_BEVERAGE = gql`
  query beverages {
  beverages {
    description
    has_alcohol
    image
    in_stock
    name
    price
    _id
  }
}
`;

export const QUERY_SINGLE_BEVERAGE = gql`
  query singleBeverage($beverageId: ID!) {
  beverage(beverageId: $beverageId) {
    description
    has_alcohol
    image
    in_stock
    name
    price
    _id
  }
}
`;
