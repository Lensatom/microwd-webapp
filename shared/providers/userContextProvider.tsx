"use client"

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UserContext } from "../contexts/userContext";
import { useGetUser } from "./api";

export function UserContextProvider({ children }: { children: React.ReactNode }) {
  const { user, isPending } = useGetUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isPending && !user && pathname !== "/signup") {
      // router.replace("/signup");
    }
  }, [isPending, user, pathname, router]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <>{children}</>;
  }

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );

}