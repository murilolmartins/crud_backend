import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { UserType } from "../typeDefs/user";
import { UserEdge } from "../typeDefs/user";
import {
  IUserCreate,
  IUserDelete,
  IUserLogin,
  IUserUpdate,
} from "../../interfaces/user.interfaces";
import {
  GraphQLContext,
  userMutationsResolvers,
} from "../../resolvers/user/userMutations.resolvers";
import { mutationWithClientMutationId, toGlobalId } from "graphql-relay";

export const CREATE_USER = mutationWithClientMutationId({
  name: "CreateUser",
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async (args: IUserCreate) => {
    const user = await userMutationsResolvers.create(args);

    return {
      user,
      error: null,
      success: "User created",
    };
  },
  outputFields: {
    userEdge: {
      type: UserEdge,
      resolve: async ({ user }) => {
        if (!user) {
          return null;
        }
        return {
          cursor: toGlobalId("User", user.id),
          node: user,
        };
      },
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }: { error: string }) => error,
    },
    success: {
      type: GraphQLString,
      resolve: ({ success }: { success: string }) => success,
    },
  },
});

export const UPDATE_USER = mutationWithClientMutationId({
  name: "UpdateUser",
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  mutateAndGetPayload: async (args: IUserUpdate, context: GraphQLContext) => {
    const user = await userMutationsResolvers.update(args, context);

    return {
      user,
      error: null,
      success: "User Updated",
    };
  },
  outputFields: {
    userEdge: {
      type: UserEdge,
      resolve: async ({ user }) => {
        if (!user) {
          return null;
        }
        return {
          cursor: toGlobalId("User", user.id),
          node: user,
        };
      },
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }: { error: string }) => error,
    },
    success: {
      type: GraphQLString,
      resolve: ({ success }: { success: string }) => success,
    },
  },
});

export const DELETE_USER = mutationWithClientMutationId({
  name: "DeleteUser",
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  mutateAndGetPayload: async (args: IUserDelete, context: GraphQLContext) => {
    const message = await userMutationsResolvers.delete(args, context);
    return {
      message,
      error: null,
      success: "User Deleted",
    };
  },
  outputFields: {
    Message: {
      type: GraphQLString,
      resolve: ({ message }) => {
        if (!message) {
          return null;
        }
        return message;
      },
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }: { error: string }) => error,
    },
    success: {
      type: GraphQLString,
      resolve: ({ success }: { success: string }) => success,
    },
  },
});

export const LOGIN = mutationWithClientMutationId({
  name: "Login",
  inputFields: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async (args: IUserLogin, context: GraphQLContext) => {
    const token = await userMutationsResolvers.login(args);

    return {
      token,
      error: null,
      success: "Authenticated",
    };
  },
  outputFields: {
    Token: {
      type: GraphQLString,
      resolve: ({ token }) => {
        if (!token) {
          return null;
        }
        return token;
      },
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }: { error: string }) => error,
    },
    success: {
      type: GraphQLString,
      resolve: ({ success }: { success: string }) => success,
    },
  },
});
