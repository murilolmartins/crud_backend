import { compare, hash } from "bcrypt";
import { AppDataSource } from "../../data-source";
import jwt from "jsonwebtoken";
import { User } from "../../entities/user.entity";
import { AuthenticationError, ExpressContext } from "apollo-server-express";
import {
  IUser,
  IUserCreate,
  IUserDelete,
  IUserDeleteMessage,
  IUserLogin,
  IUserToken,
  IUserTokenDecripted,
  IUserUpdate,
} from "../../interfaces/user.interfaces";

require("dotenv").config();

interface GraphQLContext extends ExpressContext {
  decoded_user: IUserTokenDecripted;
}

export const userMutationsResolvers = {
  create: async (parent: any, args: IUserCreate): Promise<IUser> => {
    const { email } = args;
    const userRepository = AppDataSource.getRepository(User);

    const verifyUserExists = await userRepository.findOneBy({ email });

    if (verifyUserExists) {
      throw new Error("User alredy exists");
    }

    const user = new User();

    user.name = args.name;
    user.email = args.email.toLocaleLowerCase();
    user.password = await hash(args.password, 10);

    userRepository.create(user);

    await userRepository.save(user);

    return user;
  },

  update: async (
    parent: any,
    args: IUserUpdate,
    context: GraphQLContext
  ): Promise<IUser> => {
    const { id } = args;
    if (!context.decoded_user || context.decoded_user.id !== id) {
      throw new AuthenticationError("Unauthorized");
    }
    const userRepository = AppDataSource.getRepository(User);

    if (args.password) {
      args.password = await hash(args.password, 10);
    }
    await userRepository.update(id, { ...args });

    const user = await userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new Error("id not found");
    }

    return user;
  },

  delete: async (
    parent: any,
    { id }: IUserDelete,
    context: GraphQLContext
  ): Promise<IUserDeleteMessage> => {
    if (!context.decoded_user || context.decoded_user.id !== id) {
      throw new AuthenticationError("Unauthorized");
    }
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error("Id not found");
    }

    await userRepository.delete(id);

    return { status: true, message: "User Deleted" };
  },
  login: async (parent: any, args: IUserLogin): Promise<IUserToken> => {
    const { email, password } = args;
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new AuthenticationError("Invalid Credentials");
    }

    const compare_pwd = await compare(password, user.password);

    if (!compare_pwd) {
      throw new AuthenticationError("Invalid Credentials");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: process.env.EXPIRES_IN,
    });

    return { token };
  },
};
