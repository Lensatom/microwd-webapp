import { POST } from "@/shared/config/api/crud";
import { queryClient } from "@/shared/config/react-query";
import { useMutation } from "@tanstack/react-query";

export const useSignupWithGoogle = () => {
  const { mutateAsync } = useMutation({
    mutationFn: async (token: string) => {
      return POST({
        route: '/auth/signup/google',
        data: { token }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    }
  });

  return { signupWithGoogle: mutateAsync };
};