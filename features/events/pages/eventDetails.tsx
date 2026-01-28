import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/components/ui"
import { GET } from "@/shared/config/api/crud"
import { formatDate } from "@/shared/helpers/utils"
import { ArrowDownToLine, Calendar, ChevronDown, Eye, MapPin, Pen, Trash } from "lucide-react"
import Link from "next/link"

async function EventDetails({ id }: { id: string }) {
  const eventResponse = await GET({
    route: `/events/${id}`,
    isServer: true
  })
  const event = eventResponse.event as IEvent;
  return (
    <div className="bg-primary w-full min-h-screen py-10 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-extrabold text-white">{event.name}</h1>
      <div className="text-sm flex items-center gap-3 text-primary-light mt-2.5">
        <div className="flex items-center gap-1.5">
          <MapPin size={16} />
          <p>{event.location}</p>
        </div>
        <p>&bull;</p>
        <div className="flex items-center gap-1.5">
          <Calendar size={16} />
          <p>{formatDate(event.date)}</p>
        </div>
      </div>
      <div className="flex mt-6">
        <Button className="bg-primary-light/50 text-white rounded-r-none!" asChild>
          <Link href={`/events/${id}/attendance`}>Start taking attendace</Link>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="rounded-l-none! bg-primary-light/60">
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 text-white" align="end">
            <DropdownMenuItem>
              <Link href={`/events/${id}/attendance-list`} className="flex items-center gap-2">
                <Eye />See attendance List
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ArrowDownToLine />Download Attendance List
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pen />Edit Event
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-400">
              <Trash />Delete Event
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default EventDetails