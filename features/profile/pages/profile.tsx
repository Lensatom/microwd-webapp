"use client"

import { Input } from "@/shared/components/form"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui"
import { UserContext } from "@/shared/contexts/userContext"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useContext } from "react"

function Profile() {
  const user = useContext(UserContext)?.user!

  const router = useRouter();

  return (
    <div className="w-full px-4 mx-auto py-10 flex flex-col justify-center items-center bg-primary min-h-screen">
      <h1 className="font-bold text-2xl text-primary mb-4">Your Profile</h1>
      <div className="mt-2">
        <div className="flex mb-8 items-center">
          <button className='cursor-pointer' onClick={() => router.back()}>
            <ChevronLeft className='inline-block mr-2 text-primary-light' />
          </button>
          <Avatar className="bg-primary-light">
            <AvatarImage
              src={user?.avatar || ""}
              alt={user?.first_name + " " + user?.last_name}
              className=""
            />
            <AvatarFallback className="text-white text-xs font-medium">{user?.first_name[0] + user?.last_name[0]}</AvatarFallback>
          </Avatar>
        </div>
        <Input label="Email" placeholder="Enter your email address" className="mb-4" value={user.email} disabled />
        <Input label="First Name" placeholder="Enter your first name" className="mb-4" value={user.first_name} disabled />
        <Input label="Last Name" placeholder="Enter your last name" className="mb-4" value={user.last_name} disabled />
        <p className="mt-4 text-sm text-primary-light/50">These details are not editable for authenticity purposes.</p>
      </div>
    </div>
  )
}

export default Profile