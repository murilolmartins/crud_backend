import { gql } from "apollo-server-express";

export const userSchema = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  type Message {
    status: Boolean!
    message: String!
  }

  type Token {
    token: String!
  }

  type Query {
    getAll: [User!]!
  }

  type Mutation {
    create(name: String!, email: String!, password: String!): User!
    update(id: String!, name: String, email: String, password: String): User!
    delete(id: String!): Message!
    login(email: String!, password: String!): Token!
  }
`;
