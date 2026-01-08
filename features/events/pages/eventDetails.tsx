import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/components/ui"
import { ArrowDownToLine, Calendar, ChevronDown, Eye, LocationEdit, Pen, Trash } from "lucide-react"
import Link from "next/link"

function EventDetails() {
  return (
    <div className="bg-primary-light/5 w-full min-h-screen py-10 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-extrabold">The Forge Conference 2025</h1>
      <p className="text-sm flex items-center gap-2 text-gray-500 mt-2">
        <Calendar size={16} /> 12th October 2025 &bull; {" "}
        <LocationEdit size={16} /> San Francisco, CA
      </p>
      <div className="flex gap-2 mt-6">
        <Button asChild>
          <Link href={`/events/1/attendance`}>Start taking attendace</Link>
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