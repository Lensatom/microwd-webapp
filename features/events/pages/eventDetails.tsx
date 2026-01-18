import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/components/ui"
import { GET } from "@/shared/config/api/crud"
import { formatDate } from "@/shared/helpers/utils"
import { ArrowDownToLine, Calendar, ChevronDown, Eye, LocationEdit, Pen, Trash } from "lucide-react"
import Link from "next/link"

async function EventDetails({ id }: { id: string }) {
  const eventResponse = await GET({
    route: `/events/${id}`,
    isServer: true
  })
  const event = eventResponse.event as IEvent;
  return (
    <div className="bg-primary-light/5 w-full min-h-screen py-10 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-extrabold">{event.name}</h1>
      <p className="text-sm flex items-center gap-2 text-gray-500 mt-2">
        <Calendar size={16} /> {formatDate(event.date)} &bull; {" "}
        <LocationEdit size={16} /> {event.location}
      </p>
      <div className="flex gap-2 mt-6">
        <Button asChild>
          <Link href={`/events/${id}/attendance`}>Start taking attendace</Link>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              More actions
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuItem>
              <Eye />See attendance List
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