import { createContext } from "react";
import { IUser } from "../interfaces/user";

interface IUserContext {
  user: IUser | null | undefined;
  setUser: (user: IUser | null) => void;
}

export const UserContext = createContext<IUserContext | null>(null);