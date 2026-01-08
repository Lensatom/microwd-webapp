import { Dock, History, Plus, User } from "lucide-react"
import Link from "next/link"

function Home() {
  return (
    <div className="w-full h-screen bg-primary-light/5">
      <div className="mx-24 px-20 py-4 border-b border-b-primary-light">
        <h1 className="font-extrabold text-primary text-lg">Microwd</h1>
      </div>

      <div className="grid grid-cols-4 gap-6 px-44 mt-8 text-white">
        <Link href="/events/create" className="w-full bg-[#273E47] p-6 rounded-lg">
          <Plus />
          <h2 className="font-bold mt-1">Create an Event</h2>
        </Link>
        <div className="w-full bg-[#b3886b] p-6 rounded-lg">
          <Dock />
          <h2 className="font-bold mt-1">Submit an Attendance</h2>
        </div>
        <div className="w-full bg-[#607466] p-6 rounded-lg">
          <User />
          <h2 className="font-bold mt-1">Update Info Card</h2>
        </div>
        <div className="w-full bg-[#706C61] p-6 rounded-lg">
          <History />
          <h2 className="font-bold mt-1">Attendance History</h2>
        </div>
      </div>

      <div className="px-44 mt-10">
        <h2 className="font-semibold text-gray-500">Your Events</h2>
        <Link href={`/events/1`} className="block bg-gray-100 p-6 mt-3">
          <h3>The Forge Conference Workshop Day 1</h3>
          <p className="text-xs mt-1">12th October 2025</p>
        </Link>
        <Link href={`/events/2`} className="block bg-gray-100 p-6 mt-3">
          <h3>Moonshot 2026 Day 1</h3>
          <p className="text-xs mt-1">12th October 2025</p>
        </Link>
      </div>
    </div>
  )
}

export default Home