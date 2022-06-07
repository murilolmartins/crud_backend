import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GET_ALL_USERS } from "./queries/user.queries";
import {
  CREATE_USER,
  DELETE_USER,
  UPDATE_USER,
  LOGIN,
} from "./mutations/user.mutations";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: () => ({
    getAllUsers: GET_ALL_USERS,
  }),
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    createUser: CREATE_USER,
    deleteUser: DELETE_USER,
    updateUser: UPDATE_USER,
    login: LOGIN,
  }),
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
