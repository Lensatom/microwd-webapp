import { createContext } from "react";
import { IUser } from "../interfaces/user";

interface IUserContext {
  user: IUser;
}

export const UserContext = createContext<IUserContext | null>(null);