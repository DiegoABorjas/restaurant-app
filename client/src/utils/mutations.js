import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      admin {
        _id
        email
      }
    }
  }
`;

export const ADD_ENTREE = gql`
  mutation createEntree($entree: EntreeInput!) {
    createEntree(entree: $entree) {
      name
      description
      price
      in_stock
      allergy
      image
    }
}
`;

export const ADD_BEVERAGE = gql`
  mutation createBeverage($beverage: BeverageInput!) {
    createBeverage(beverage: $beverage) {
      name
      description
      price
      in_stock
      has_alcohol
      image
    }
}
`;

export const REMOVE_ENTREE = gql`
  mutation removeEntree($entreeId: ID!) {
    removeEntree(entreeId: $entreeId) {
      _id
      name
      description
      price
      in_stock
      allergy
      image
  }
}`
;

export const REMOVE_BEVERAGE = gql`
mutation removeBeverage($beverageId: ID!) {
  removeBeverage(beverageId: $beverageId) {
    _id
    name
    description
    price
    in_stock
    has_alcohol
    image
  }
}`