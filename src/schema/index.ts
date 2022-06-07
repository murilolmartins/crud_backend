import { gql } from "apollo-server-express";
import { userSchema } from "./user.schemas";

export const typeDefs = gql`
  ${userSchema}
`;
