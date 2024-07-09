import { useMutation, useQuery } from "@tanstack/react-query";
import { getCurrentUser, registerUser as registerUserApi } from "@/api/user";
import toast from "react-hot-toast";

export function useRegisterUser() {
  const { mutate: registerUser, isPending: isRegisteringUser } = useMutation({
    mutationFn: registerUserApi,
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });

  return { registerUser, isRegisteringUser };
}

export function useCurrentUser() {
  const { data: currentUser, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { currentUser, isLoadingUser };
}
