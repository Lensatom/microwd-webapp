import { GET } from "@/shared/config/api/crud";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const data = await GET({
        route: '/user',
      });
      return data;
    }
  });

  return { user : data?.user, ...rest };
};