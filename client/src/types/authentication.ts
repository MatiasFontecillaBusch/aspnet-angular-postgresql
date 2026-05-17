import { User } from "./user";

export interface LoginParams {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  tokenExpiration: Date;
  refreshToken: string;
  refreshTokenExpiration: Date;
  user: User
}
