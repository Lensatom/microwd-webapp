"use client"

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";
import { useGetUser } from "./api";
import { Loader } from "../components/ui";
import { IUser } from "../interfaces/user";

export function UserContextProvider({ children }: { children: React.ReactNode }) {
  const { user: fetchedUser, isPending } = useGetUser();
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<IUser | null>();

  useEffect(() => {
    setUser(fetchedUser);
  }, [fetchedUser]);

  useEffect(() => {
    if (user === undefined) return;
    if (!isPending && !user && pathname !== "/signup") {
      router.replace(`/signup?redirect=${encodeURIComponent(pathname)}`);
    }
    if (!isPending && user && pathname === "/signup") {
      if (pathname.includes("redirect=")) {
        const redirectTo = decodeURIComponent(pathname.split("redirect=")[1]);
        router.replace(redirectTo);
        return;
      }
      router.replace("/");
    }
  }, [isPending, user, pathname, router]);

  if (isPending || !user) {
    return (
      <div className="w-full h-screen bg-primary flex justify-center items-center">
        <Loader label="Loading Microwd" />
      </div>
    )
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}