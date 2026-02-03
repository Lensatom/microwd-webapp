import { POST } from "@/shared/config/api/crud";
import { useMutation } from "@tanstack/react-query";

export const useSignupWithGoogle = () => {
  const { mutateAsync } = useMutation({
    mutationFn: async (token: string) => {
      return POST({
        route: '/auth/signup/google',
        data: { token }
      });
    }
  });

  return { signupWithGoogle: mutateAsync };
};