import { GET, POST } from "@/shared/config/api/crud";
import { useMutation, useQuery } from "@tanstack/react-query";

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
      return GET({route: '/events'})
    }
  });
  const event = data.event as IEvent || null;
  return { event, ...rest };
}