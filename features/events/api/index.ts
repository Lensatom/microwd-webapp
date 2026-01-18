import { POST } from "@/shared/config/api/crud";
import { useMutation } from "@tanstack/react-query";

export function useCreateEvent() {
  const { mutateAsync: createEvent, ...rest } = useMutation({
    mutationFn: async (data: Omit<IEvent, "id">) => {
      return POST({
        route: '/events',
        data
      })
    }
  });
  return { createEvent, ...rest };
}