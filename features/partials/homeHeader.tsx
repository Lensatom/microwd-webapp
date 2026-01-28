"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui"
import { UserContext } from "@/shared/contexts/userContext"
import { useContext } from "react"

function HomeHeader() {
  const { user } = useContext(UserContext)!
  
  return (
    <header className="py-4 border-primary-light rounded-full flex w-full justify-between items-center">
      <h1 className="font-extrabold text-primary-light text-lg">Microwd</h1>
      <Avatar className="bg-primary-light">
        <AvatarImage
          src={user?.avatar || ""}
          alt="@shadcn"
          className=""
        />
        <AvatarFallback className="text-white text-xs font-medium">{user?.first_name[0] + user?.last_name[0]}</AvatarFallback>
      </Avatar>
    </header>
  )
}

export default HomeHeader