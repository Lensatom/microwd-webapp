import { GET } from "@/shared/config/api/crud"
import { formatDate } from "@/shared/helpers/utils";
import { Dock, History, Plus, User } from "lucide-react"
import Link from "next/link"

async function Home() {
  const eventsResponse = await GET({
    route: '/events/me',
    isServer: true
  })
  const eventsList = eventsResponse.events as IEvent[];

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
        <Link href="/attendance" className="w-full bg-[#b3886b] p-6 rounded-lg">
          <Dock />
          <h2 className="font-bold mt-1">Submit an Attendance</h2>
        </Link>
        <Link href="/profile" className="w-full bg-[#607466] p-6 rounded-lg">
          <User />
          <h2 className="font-bold mt-1">Update Info Card</h2>
        </Link>
        <Link href="/attendance/history" className="w-full bg-[#706C61] p-6 rounded-lg">
          <History />
          <h2 className="font-bold mt-1">Attendance History</h2>
        </Link>
      </div>

      <div className="px-44 mt-10">
        <h2 className="font-semibold text-gray-500">Your Events</h2>
        <div className="grid grid-cols-2 gap-2">
          {eventsList.length ? eventsList.map((event) => (
            <Link key={event._id} href={`/events/${event._id}`} className="block bg-gray-100 p-6 mt-3">
              <h3>{event.name}</h3>
              <p className="text-xs mt-1">{formatDate(event.date)}</p>
            </Link>
          )) : (
            <p className="text-sm text-gray-400 mt-2 col-span-2">You have not created any events yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home