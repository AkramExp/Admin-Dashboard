import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getCurrentUser,
  registerUser as registerUserApi,
  loginUser as loginUserApi,
} from "@/api/user";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useRegisterUser() {
  const { mutate: registerUser, isPending: isRegisteringUser } = useMutation({
    mutationFn: registerUserApi,
    onSuccess: (response) => {
      localStorage.setItem(
        "userToken",
        JSON.stringify(response.data.userToken)
      );

      toast.success(response.message);
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });

  return { registerUser, isRegisteringUser };
}

export function useLoginUser() {
  const { mutate: loginUser, isPending: isLoggingUser } = useMutation({
    mutationFn: loginUserApi,
    onSuccess: (response) => {
      localStorage.setItem(
        "userToken",
        JSON.stringify(response.data.userToken)
      );

      toast.success(response.message);
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });

  return { loginUser, isLoggingUser };
}

export function useCurrentUser() {
  const { data: currentUser, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    retry: false,
  });

  return { currentUser, isLoadingUser };
}
