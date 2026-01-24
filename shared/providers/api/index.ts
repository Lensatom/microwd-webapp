import { GET } from "@/shared/config/api/crud";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      return GET({
        route: '/user',
      });
    }
  });

  return { user : data?.user, ...rest };
};