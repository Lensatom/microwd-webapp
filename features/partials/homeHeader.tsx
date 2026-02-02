"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui"
import { UserContext } from "@/shared/contexts/userContext"
import { Dock, History, Menu, Plus } from "lucide-react"
import Link from "next/link"
import { useContext, useState } from "react"

function HomeHeader() {
  const { user } = useContext(UserContext)!

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
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
        <Menu className="text-primary-light lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} />
      </div>

      {isMenuOpen && (
        <div className="absolute w-full h-screen top-0 left-0 bg-black/50 backdrop-blur-[2px] z-50 flex justify-end" onClick={() => setIsMenuOpen(false)}>
          <div
            className="w-2/3 max-w-xs h-full bg-primary p-6 flex flex-col gap-6 text-white/50"
            onClick={(e) => e.stopPropagation()}
            style={{animation: "slideInLeft 0.2s ease-in-out", animationFillMode: "forwards"}}
          >
            <Link href="/profile" className="flex items-center gap-2">
              <Avatar className="bg-primary-light">
                <AvatarImage
                  src={user?.avatar || ""}
                  alt={user?.first_name + " " + user?.last_name}
                  className=""
                />
                <AvatarFallback className="text-white text-xs font-medium">{user?.first_name[0] + user?.last_name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-primary-light text-sm">{user?.first_name + " " + user?.last_name}</h2>
                <p className="text-xs text-primary-light/50">{user?.email}</p>
              </div>
            </Link>
            <Link href="/events/create" className="lg:w-full bg-[#273E47]/80 p-4 rounded-md flex items-center gap-2">
              <Plus />
              <h2 className="font-bold mt-1 whitespace-nowrap">Create Event</h2>
            </Link>
            <Link href="/attendance" className="lg:w-full bg-[#b3886b]/80 p-4 rounded-md flex items-center gap-2">
              <Dock />
              <h2 className="font-bold mt-1 whitespace-nowrap">Submit Attendance</h2>
            </Link>
            <Link href="/attendance/history" className="lg:w-full bg-[#706C61]/80 p-4 rounded-md flex items-center gap-2">
              <History />
              <h2 className="font-bold mt-1 whitespace-nowrap">History</h2>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default HomeHeader