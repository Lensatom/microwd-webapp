"use client"

import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DropdownMenuItem } from "@/shared/components/ui"
import { Trash } from "lucide-react"
import { useDeleteEvent } from "../api"
import { useRouter } from "next/navigation";

function DeleteEvent({ eventId }: { eventId: string }) {
  const router = useRouter();

  const { deleteEvent, isPending } = useDeleteEvent({ eventId });

  const handleDeleteEvent = async () => {
    try {
      await deleteEvent();
      router.back();
    }
    catch (error) {
      console.error("Error deleting event:", error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem className="text-red-400 cursor-pointer" onSelect={(e) => e.preventDefault()}>
          <Trash />Delete Event
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this event?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your event and all associated attendance data.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 mt-2 gap-3">
          <DialogClose asChild>
            <Button variant="outline" size="sm" className="mr-2 w-full">Cancel</Button>
          </DialogClose>
          <Button size="sm" isLoading={isPending} variant="destructive" className="w-full" onClick={() => handleDeleteEvent()} disabled={isPending}>
            Delete Event
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteEvent