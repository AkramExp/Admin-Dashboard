import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCurrentUser,
  registerUser as registerUserApi,
  loginUser as loginUserApi,
  logoutUser as logoutUserApi,
  getUserById,
  updateUser as updateUserApi,
  getAllUsers,
  toggleFollow as toggleFollowApi,
} from "@/api/user";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export function useRegisterUser() {
  const { mutate: registerUser, isPending: isRegisteringUser } = useMutation({
    mutationFn: registerUserApi,
    onSuccess: (response) => {
      localStorage.setItem("userToken", response.data.userToken);
      document.cookie = "userToken = " + response.data.userToken;
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });

  return { registerUser, isRegisteringUser };
}

export function useLoginUser() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: loginUser, isPending: isLoggingUser } = useMutation({
    mutationFn: loginUserApi,
    onSuccess: (response) => {
      localStorage.setItem("userToken", response.data.userToken);
      navigate("/", { replace: true });
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["current-user"] });
      }, 100);
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });

  return { loginUser, isLoggingUser };
}

export function useLogoutUser() {
  const navigate = useNavigate();

  const { mutate: logoutUser, isPending: isLoggingOut } = useMutation({
    mutationFn: logoutUserApi,
    onSuccess: (response) => {
      toast(response.message);
      navigate("/sign-in", { replace: true });
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });

  return { logoutUser, isLoggingOut };
}

export function useCurrentUser() {
  const { data: currentUser, isLoading: isLoadingUser } = useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
    retry: false,
  });

  return { currentUser, isLoadingUser };
}

export function useUserById() {
  const { userId } = useParams();

  const { data: currentUser, isLoading: isLoadingIdUser } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
  });

  return { currentUser, isLoadingIdUser };
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdatingUser } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: (response) => {
      toast(response.message);
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    onError: (error: string) => {
      toast(error);
    },
  });

  return { updateUser, isUpdatingUser };
}

export function useAllUsers() {
  const { data: allUsers, isLoading: isLoadingAllUsers } = useQuery({
    queryKey: ["all-users"],
    queryFn: getAllUsers,
  });

  return { allUsers, isLoadingAllUsers };
}

export function useToggleFollow() {
  const queryClient = useQueryClient();

  const { mutate: toggleFollow, isPending: isTogglingFollow } = useMutation({
    mutationFn: toggleFollowApi,
    onSuccess: (response) => {
      toast(response.message);
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["recent-posts"] });
    },
    onError: (error: string) => {
      toast(error);
    },
  });

  return { toggleFollow, isTogglingFollow };
}
