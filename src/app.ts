import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./schema/index";
import { resolvers } from "./resolvers/index";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

require("dotenv").config();

(async () => {
  const app = express();

  const getUser = (token: string | undefined) => {
    if (!token) return null;

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);

      return decodedToken;
    } catch (err) {
      return null;
    }
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      decoded_user: getUser(req.headers.authorization),
    }),
    formatError: (error: GraphQLError) => {
      return {
        message: error.message,
        locations: error.locations,
        stack: error.stack,
      };
    },
  });

  await server.start();

  server.applyMiddleware({ app, path: "/api" });

  app.use(cors());

  app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}`);
  });
})();
