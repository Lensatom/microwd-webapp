import { IEvent } from "@/features/events/types";
import { HomeHeader } from "@/features/home/partials";
import { AnimatedList } from "@/shared/components/shared";
import { GET } from "@/shared/config/api/crud";
import { isTransientApiError } from "@/shared/config/api/axios";
import { formatDate } from "@/shared/helpers/utils";
import { Calendar, ChevronRight, Dock, History, Plus } from "lucide-react";
import Link from "next/link";

async function Home() {
  let eventsList: IEvent[] = [];
  let isWakingUp = false;

  try {
    const eventsResponse = await GET({
      route: '/events/me',
      isServer: true
    })

    eventsList = (eventsResponse.events as IEvent[]) ?? [];
  } catch (error) {
    if (isTransientApiError(error)) {
      isWakingUp = true;
      
      return (
        <div className="h-screen bg-primary lg:pt-6 w-full">
          <div className="lg:w-1/2 px-4 lg:px-0 mx-auto">
            <HomeHeader />
            <p className="text-sm text-primary-light/70 mt-10 text-center">
              Server is waking up. Refresh in a few seconds if your events do not appear yet.
            </p>
          </div>
        </div>
      )
    }

    throw error;
  }

  return (
    <div className="h-screen bg-primary lg:pt-6 w-full">
      <div className="lg:w-1/2 px-4 lg:px-0 mx-auto">
        <HomeHeader />

        <section className="lg:grid lg:grid-cols-3 flex flex-col overflow-x-auto gap-2 lg:mt-5 text-gray-300/80">
          <Link href="/events/create" className="lg:w-full bg-black/35 border border-white/10 hover:bg-black/55 transition-colors p-4 rounded-md flex items-center gap-2">
            <Plus />
            <h2 className="font-bold mt-1 whitespace-nowrap">Create Event</h2>
            <ChevronRight size={16} className="ml-auto block md:hidden" />
          </Link>
          <Link href="/attendance" className="lg:w-full bg-black/35 border border-white/10 hover:bg-black/55 transition-colors p-4 rounded-md flex items-center gap-2">
            <Dock />
            <h2 className="font-bold mt-1 whitespace-nowrap">Submit Attendance</h2>
            <ChevronRight size={16} className="ml-auto block md:hidden" />
          </Link>
          <Link href="/attendance/history" className="lg:w-full bg-black/35 border border-white/10 hover:bg-black/55 transition-colors p-4 rounded-md flex items-center gap-2">
            <History />
            <h2 className="font-bold mt-1 whitespace-nowrap">History</h2>
            <ChevronRight size={16} className="ml-auto block md:hidden" />
          </Link>
        </section>

        <section className="mt-8 lg:mt-12">
          <div className="flex items-center gap-2 text-white/50">
            <Calendar size={20} />
            <h2 className="font-semibold">
              Your events
            </h2>
          </div>

          <div className="grid grid-cols-1 mt-6 gap-2 px-4 lg:px-0">
            {eventsList.length ? eventsList.map((event, index) => (
              <Link key={event._id} href={`/events/${event._id}`} className="flex items-center gap-2 rounded-lg -mx-4">
                <AnimatedList
                  mainText={event.name}
                  subText={event.location}
                  endText={formatDate(event.date)}
                  delayIndex={index}
                />
              </Link>
            )) : (
              <p className="text-sm text-gray-400 mt-2 col-span-2 text-center">You have not created any events yet.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home