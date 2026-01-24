"use client"

import { redirect } from "next/navigation";
import { UserContext } from "../contexts/userContext";
import { useGetUser } from "./api";

export function UserContextProvider({ children }: { children: React.ReactNode }) {
  const { user, isPending } = useGetUser();

  if (isPending) {
    return <div>Loading...</div>;
  }
  
  if (!user && !isPending) {
    redirect('/signin');
  }

  return (
    <UserContext.Provider value={{ user: user! }}>
      {children}
    </UserContext.Provider>
  )

}