import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUser } from "../../interfaces/user.interfaces";

export const userQueriesResolvers = {
  getAll: async (): Promise<IUser[]> => {
    const userRepository = AppDataSource.getRepository(User);

    const users: IUser[] = await userRepository.find();
    return users;
  },
};
