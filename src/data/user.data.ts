import { IUser } from "types/user.types";

export function getUserData(): IUser {
  return {
    username: "maksimTest",
    password: "Password",
  };
}
