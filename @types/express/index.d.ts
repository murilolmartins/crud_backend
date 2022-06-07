import { IUserTokenDecripted } from "../../src/interfaces/user.interfaces";

declare global {
  namespace Express {
    interface Request {
      decoded_user: IUserTokenDecripted | null;
    }
  }
}
