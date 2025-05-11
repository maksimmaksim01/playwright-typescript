import { USER_LOGIN, USER_PASSWORD } from "config/evnironment";
import { IUser } from "types/user.types";

export function getUserData(): IUser {
  return {
    username: USER_LOGIN,
    password: USER_PASSWORD,
  };
}
