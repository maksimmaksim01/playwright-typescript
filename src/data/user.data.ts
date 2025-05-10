import { IUser } from "types/user.types";

export function getUserData(data?: Partial<IUser>): IUser {
  return {
    username: "maksimTest",
    password: "Password",
  };
}
