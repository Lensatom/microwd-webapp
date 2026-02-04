"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";
import { useGetUser } from "./api";
import { Loader } from "../components/ui";
import { IUser } from "../interfaces/user";

export function UserContextProvider({ children }: { children: React.ReactNode }) {
  const { user: fetchedUser, isPending, isError } = useGetUser();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "";

  const [user, setUser] = useState<IUser | null | undefined>(undefined);

  useEffect(() => {
    if (isError) {
      setUser(null);
      return;
    }
    setUser(fetchedUser);
  }, [fetchedUser, isError]);

  useEffect(() => {
    if (user === undefined) return;
    if (!isPending && !user && pathname !== "/signup") {
      router.replace(`/signup${pathname === "/profile" ? "" : `?redirect=${encodeURIComponent(pathname)}`}`);
    }
    if (!isPending && user && pathname === "/signup") {
      if (redirect) {
        const redirectTo = decodeURIComponent(redirect);
        router.replace(redirectTo);
        return;
      }
      router.replace("/");
    }
  }, [isPending, user, pathname, router, redirect]);

  if (isPending || user === undefined) {
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