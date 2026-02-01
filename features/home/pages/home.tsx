import { IEvent } from "@/features/events/types";
import { HomeHeader } from "@/features/partials";
import { AnimatedList } from "@/shared/components/shared";
import { GET } from "@/shared/config/api/crud";
import { formatDate } from "@/shared/helpers/utils";
import { Calendar, Dock, History, Plus } from "lucide-react";
import Link from "next/link";

async function Home() {
  const eventsResponse = await GET({
    route: '/events/me',
    isServer: true
  })
  const eventsList = eventsResponse.events as IEvent[];

  return (
    <div className="h-screen bg-primary pt-6 w-full">
      <div className="w-1/2 mx-auto">
        <HomeHeader />

        <section className="grid grid-cols-3 gap-6 mt-5 text-gray-300/80">
          <Link href="/events/create" className="w-full bg-[#273E47]/80 p-4 rounded-md flex items-center gap-2">
            <Plus />
            <h2 className="font-bold mt-1">Create Event</h2>
          </Link>
          <Link href="/attendance" className="w-full bg-[#b3886b]/80 p-4 rounded-md flex items-center gap-2">
            <Dock />
            <h2 className="font-bold mt-1">Submit Attendance</h2>
          </Link>
          <Link href="/attendance/history" className="w-full bg-[#706C61]/80 p-4 rounded-md flex items-center gap-2">
            <History />
            <h2 className="font-bold mt-1">History</h2>
          </Link>
        </section>

        <section className="mt-12">
          <div className="flex items-center gap-2 text-white/50">
            <Calendar size={20} />
            <h2 className="font-semibold">
              You are hosting...
            </h2>
          </div>
          <div className="grid grid-cols-1 mt-6 gap-2">
            {eventsList.length ? eventsList.map((event, index) => (
              <Link key={event._id} href={`/events/${event._id}`} className="flex border items-center gap-2 rounded-lg -mx-4">
                <AnimatedList
                  mainText={event.name}
                  subText={event.location}
                  endText={formatDate(event.date)}
                  delayIndex={index}
                />
              </Link>
            )) : (
              <p className="text-sm text-gray-400 mt-2 col-span-2">You have not created any events yet.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home