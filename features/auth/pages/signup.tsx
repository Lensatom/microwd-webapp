import { Button } from "@/shared/components/ui"
import { GoalIcon } from "lucide-react"
import Image from "next/image"
import googleImage from "../assets/google.png"

function Signup() {
  return (
    <div className="w-full h-screen bg-primary-light text-white flex">
      <div className="w-1/2 h-full bg-primary flex justify-center items-center">
        {/* animation should run for 60s */}
        <GoalIcon size={350} className="text-primary-light" />
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center gap-8">
        <h1 className="text-5xl font-extrabold text-primary">Microwd</h1>
        <p className="text-gray-600 text-sm w-1/2 text-center">Take attendance easier, faster and more securely. Signup with Google to continue</p>
        <Button type="button" className="bg-transparent border border-primary text-primary">
          <Image src={googleImage} alt="Google Logo" width={20} height={20} className="fill-primary" />
          Continue with Google
        </Button>
      </div>
    </div>
  )
}

export default Signup