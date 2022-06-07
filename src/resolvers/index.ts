import { userQueriesResolvers } from "./user/userQueries.resolvers";
import { userMutationsResolvers } from "./user/userMutations.resolvers";

export const resolvers = {
  Query: {
    ...userQueriesResolvers,
  },
  Mutation: {
    ...userMutationsResolvers,
  },
};
