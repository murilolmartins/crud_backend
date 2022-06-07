import { GraphQLList, GraphQLNonNull } from "graphql";
import { UserConnection, UserType } from "../typeDefs/user";
import { User } from "../../entities/user.entity";
import { userQueriesResolvers } from "../../resolvers/user/userQueries.resolvers";
import { connectionArgs, connectionFromArray } from "graphql-relay";

export const GET_ALL_USERS = {
  type: new GraphQLNonNull(UserConnection),
  args: connectionArgs,
  resolve: async (_: any, args: any) => {
    const users = await userQueriesResolvers.getAll();
    return connectionFromArray(users, args);
  },
};
