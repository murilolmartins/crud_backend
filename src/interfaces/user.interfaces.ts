export interface IUser {
  id?: string | undefined;
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
}

export interface IUserCreate {
  name: string;
  email: string;
  password: string;
}

export interface IUserUpdate {
  id: string;
  name?: string;
  email?: string;
  password?: string;
}

export interface IUserDelete {
  id: string;
}

export interface IUserDeleteMessage {
  status: boolean;
  message: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserToken {
  token: string;
}

export interface IUserTokenDecripted {
  id: string;
  iat: number;
  exp: number;
}
