"use client"

import { Input } from "@/shared/components/form"
import { UserContext } from "@/shared/contexts/userContext"
import { useContext } from "react"

function Profile() {
  const { user } = useContext(UserContext)!
  return (
    <div className="w-[30%] mx-auto py-10 flex flex-col justify-center items-center bg-primary-light/5 min-h-screen">
      <h1 className="font-bold text-2xl text-primary mb-4">Your Profile</h1>
      <div className="mt-2">
        <Input label="Email" placeholder="Enter your email address" className="mb-4" value={user.email} disabled />
        <Input label="First Name" placeholder="Enter your first name" className="mb-4" value={user.first_name} disabled />
        <Input label="Last Name" placeholder="Enter your last name" className="mb-4" value={user.last_name} disabled />
      </div>
    </div>
  )
}

export default Profile