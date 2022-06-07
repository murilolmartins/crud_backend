import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";
import { connectionDefinitions, globalIdField } from "graphql-relay";

export const UserType = new GraphQLObjectType({
  name: "User",
  description: "User type",
  fields: () => ({
    id: globalIdField("User"),
    name: { type: GraphQLString, resolve: (user) => user.name },
    email: { type: GraphQLString, resolve: (user) => user.email },
    password: { type: GraphQLString, resolve: (user) => user.password },
  }),
});

const { connectionType: UserConnection, edgeType: UserEdge } =
  connectionDefinitions({
    nodeType: UserType,
  });

export { UserConnection, UserEdge };

export default UserType;
