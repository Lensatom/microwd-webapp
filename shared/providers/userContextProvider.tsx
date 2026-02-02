"use client"

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { UserContext } from "../contexts/userContext";
import { useGetUser } from "./api";
import { Loader } from "../components/ui";

export function UserContextProvider({ children }: { children: React.ReactNode }) {
  const { user, isPending } = useGetUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isPending && !user && pathname !== "/signup") {
      router.replace("/signup");
    }
    if (!isPending && user && pathname === "/signup") {
      router.replace("/");
    }
  }, [isPending, user, pathname, router]);

  if (isPending) {
    return (
      <div className="w-full h-screen bg-primary flex justify-center items-center">
        <Loader label="Loading Microwd" />
      </div>
    )
  }

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
}