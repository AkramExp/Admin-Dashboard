import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCurrentUser,
  registerUser as registerUserApi,
  loginUser as loginUserApi,
  logoutUser as logoutUserApi,
} from "@/api/user";
import toast from "react-hot-toast";

export function useRegisterUser() {
  const { mutate: registerUser, isPending: isRegisteringUser } = useMutation({
    mutationFn: registerUserApi,
    onSuccess: (response) => {
      localStorage.setItem(
        "userToken",
        JSON.stringify(response.data.userToken)
      );

      document.cookie = "userToken = " + response.data.userToken;
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

      document.cookie = "userToken = " + response.data.userToken;
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });

  return { loginUser, isLoggingUser };
}

export function useLogoutUser() {
  const queryClient = useQueryClient();

  const { mutate: logoutUser, isPending: isLoggingOut } = useMutation({
    mutationFn: logoutUserApi,
    onSuccess: (response) => {
      toast(response.message);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });

  return { logoutUser, isLoggingOut };
}

export function useCurrentUser() {
  const { data: currentUser, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    retry: false,
  });

  return { currentUser, isLoadingUser };
}
