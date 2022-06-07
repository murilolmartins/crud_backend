import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema/index";
const expressPlayground =
  require("graphql-playground-middleware-express").default;

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
  app.use(express.json());
  app.use(
    "/graphql",
    graphqlHTTP((req) => ({
      schema,
      graphiql: true,
      context: {
        decoded_user: getUser(req.headers.authorization),
      },
    }))
  );
  app.get("/playground", expressPlayground({ endpoint: "/graphql" }));
  app.use(cors());

  app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}`);
  });
})();
