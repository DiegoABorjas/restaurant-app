const typeDefs = `
  type Admin {
    _id: ID!
    name: String!
    email: String!
    password: String
  }

  input RestaurantInput {
    name: String!
    address: String!
    city: String!
    state: String!
    zipcode: String!
    phonenumber: String!
    description: String!
  }

  input RestaurantUpdate {
    name: String
    address: String
    city: String
    state: String
    zipcode: String
    phonenumber: String
    description: String
  }

  type Restaurant {
    _id: ID!
    name: String!
    address: String!
    city: String!
    state: String!
    zipcode: String!
    phonenumber: String!
    description: String!
  }

  input EntreeInput {
    name: String!
    description: String!
    price: Float!
    in_stock: Boolean!
    allergy: [String!]!
    image: String
  }

  input EntreeUpdate {
    name: String
    description: String
    price: Float
    in_stock: Boolean
    allergy: [String]
    image: String
  }

  input EntreeFilter {
    name: String
    in_stock: Boolean
    allergy: [String]
  }

  type Entree {
    _id: ID!
    name: String!
    description: String!
    price: Float!
    in_stock: Boolean!
    allergy: [String]!
    image: String
  }

  input BeverageInput {
    name: String!
    description: String!
    price: Float!
    in_stock: Boolean!
    has_alcohol: Boolean!
    image: String
  }

  input BeverageUpdate {
    name: String
    description: String
    price: Float
    in_stock: Boolean
    has_alcohol: Boolean
    image: String
  }

  input BeverageFilter {
    name: String
    in_stock: Boolean
    has_alcohol: Boolean
  }

  type Beverage {
    _id: ID!
    name: String!
    description: String!
    price: Float!
    in_stock: Boolean!
    has_alcohol: Boolean!
    image: String
  }

  type Auth {
    token: ID!
    admin: Admin
  }

  type Query {
    admin(username: String!): Admin
    restaurants: [Restaurant]
    entrees(filter: EntreeFilter): [Entree]
    entree(entreeId: ID!): Entree
    beverages(filter: BeverageFilter): [Beverage]
    beverage(beverageId: ID!): Beverage
    me: Admin
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createRestaurant( restaurant : RestaurantInput! ): Restaurant!
    createEntree( entree: EntreeInput!): Entree!
    createBeverage( beverage: BeverageInput!): Beverage!
    removeRestaurant(restaurantId: ID!): Restaurant!
    removeEntree(entreeId: ID!): Entree!
    removeBeverage(beverageId: ID!): Beverage!
    updateRestaurant(id: ID!, restaurant: RestaurantUpdate!): Restaurant!
    updateEntree(id: ID!, entree: EntreeUpdate!): Entree!
    updateBeverage(id: ID!, beverage: BeverageUpdate!): Beverage!
  }
`;

module.exports = typeDefs;