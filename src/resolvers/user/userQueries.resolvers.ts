import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUser } from "../../interfaces/user.interfaces";

export class userQueriesResolvers {
  static userRepository = AppDataSource.getRepository(User);
  static async getAll(): Promise<IUser[]> {
    const users: IUser[] = await this.userRepository.find();
    return users;
  }
}
