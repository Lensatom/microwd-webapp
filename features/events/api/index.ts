import { GET, POST, PUT } from "@/shared/config/api/crud";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IEvent } from "../types";

export function useCreateEvent() {
  const { mutateAsync: createEvent, ...rest } = useMutation({
    mutationFn: async (data: Omit<IEvent, "_id">) => {
      return POST({
        route: '/events',
        data
      })
    }
  });
  return { createEvent, ...rest };
}

export function useGetEventById({ eventId}: { eventId: string }) {
  const { data, ...rest } = useQuery({
    queryKey: ['event', eventId],
    queryFn: async () => {
      return GET({route: `/events/${eventId}`});
    }
  });
  const event = data?.event as IEvent || null;
  return { event, ...rest };
}

export function useDeleteEvent({ eventId }: { eventId: string }) {
  const { mutateAsync: deleteEvent, ...rest } = useMutation({
    mutationFn: async () => {
      return PUT({
        route: `/events/${eventId}`,
        data: {
          isDeleted: true
        }
      })
    }
  });
  return { deleteEvent, ...rest };
}