"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";
import { useGetUser } from "./api";
import { Button, Loader } from "../components/ui";
import { IUser } from "../interfaces/user";
import { isTransientApiError, isUnauthorizedError } from "../config/api/axios";

export function UserContextProvider({ children }: { children: React.ReactNode }) {
  const { user: fetchedUser, isPending, isFetching, isError, error, refetch } = useGetUser();
  const router = useRouter();
  const pathname = usePathname();
  const isPublicRoute = pathname === "/signup" || pathname === "/about";
  const [redirect, setRedirect] = useState("");
  const isTransientError = isTransientApiError(error);

  function RedirectReader({ onChange }: { onChange: (value: string) => void }) {
    const searchParams = useSearchParams();
    useEffect(() => {
      onChange(searchParams.get("redirect") || "");
    }, [searchParams, onChange]);
    return null;
  }

  const [user, setUser] = useState<IUser | null | undefined>(undefined);

  useEffect(() => {
    if (isError) {
      if (isUnauthorizedError(error)) {
        setUser(null);
        return;
      }

      if (isTransientError) {
        setUser(undefined);
        return;
      }

      setUser(null);
      return;
    }

    setUser(fetchedUser);
  }, [fetchedUser, isError, error, isTransientError]);

  useEffect(() => {
    if (user === undefined) return;
    if (!isPending && !isFetching && !user && !isPublicRoute) {
      router.replace(`/signup${pathname === "/profile" ? "" : `?redirect=${encodeURIComponent(pathname)}`}`);
    }
    if (!isPending && !isFetching && user && pathname === "/signup") {
      if (redirect) {
        const redirectTo = decodeURIComponent(redirect);
        router.replace(redirectTo);
        return;
      }
      router.replace("/");
    }
  }, [isPending, isFetching, user, pathname, router, redirect, isPublicRoute]);

  if (isPending || isFetching || user === undefined) {
    return (
      <div className="w-full h-screen bg-primary flex flex-col justify-center items-center gap-4 px-6 text-center">
        <Suspense fallback={null}>
          <RedirectReader onChange={setRedirect} />
        </Suspense>

        <Loader label={isTransientError ? "There was trouble loading. Retrying automatically..." : "Loading Microwd"} />

        {isTransientError ? (
          <Button variant="outline" onClick={() => refetch()}>
            Retry now
          </Button>
        ) : null}
      </div>
    )
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Suspense fallback={null}>
        <RedirectReader onChange={setRedirect} />
      </Suspense>
      {children}
    </UserContext.Provider>
  );
}