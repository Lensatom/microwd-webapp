"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui"
import { UserContext } from "@/shared/contexts/userContext"
import Link from "next/link"
import { useContext } from "react"

function HomeHeader() {
  const user = useContext(UserContext)?.user!;
  
  return (
    <header className="py-4 border-primary-light rounded-full flex w-full justify-between items-center">
      <h1 className="font-extrabold text-primary-light text-lg">Microwd</h1>
      <div className="flex items-center gap-2">
        <Link href="/profile" className="flex items-center gap-2">
          <Avatar className="bg-primary-light">
            <AvatarImage
              src={user?.avatar || ""}
              alt={user?.first_name + " " + user?.last_name}
              className=""
            />
            <AvatarFallback className="text-white text-xs font-medium">{user?.first_name[0] + user?.last_name[0]}</AvatarFallback>
          </Avatar>
          <div className="hidden lg:block">
            <h2 className="text-primary-light text-sm">{user?.first_name + " " + user?.last_name}</h2>
            <p className="text-xs text-primary-light/50">{user?.email}</p>
          </div>
        </Link>
      </div>
    </header>
  )
}

export default HomeHeader