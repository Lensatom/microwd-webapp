import { Input } from "@/shared/components/form"

function Profile() {
  return (
    <div className="w-[30%] mx-auto py-10 flex flex-col justify-center items-center bg-primary-light/5 min-h-screen">
      <h1 className="font-bold text-2xl text-primary mb-4">Your Profile</h1>
      <div className="mt-2">
        <Input placeholder="Enter your email address" className="mb-4" />
        <Input placeholder="Enter your first name" className="mb-4" />
        <Input placeholder="Enter your last name" className="mb-4" />
      </div>
    </div>
  )
}

export default Profile