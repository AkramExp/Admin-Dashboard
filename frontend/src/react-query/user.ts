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
  getFollowing,
  getFollowers,
  getTopCreators,
} from "@/api/user";
import toast from "react-hot-toast";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";

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
    onSuccess: () => {
      // localStorage.setItem("userToken", response.data.userToken);
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
  const { setIsAuthenticated } = useUserContext();

  const { mutate: logoutUser, isPending: isLoggingOut } = useMutation({
    mutationFn: logoutUserApi,
    onSuccess: (response) => {
      toast(response.message);
      setIsAuthenticated(false);
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
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  const { data: allUsers, isLoading: isLoadingAllUsers } = useQuery({
    queryKey: ["all-users"],
    queryFn: () => getAllUsers(search),
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
      queryClient.invalidateQueries({ queryKey: ["following"] });
      queryClient.invalidateQueries({ queryKey: ["followers"] });
    },
    onError: (error: string) => {
      toast(error);
    },
  });

  return { toggleFollow, isTogglingFollow };
}

export function useFollowing() {
  const { userId } = useParams();

  const { data: following, isLoading: isLoadingFollowing } = useQuery({
    queryKey: ["following", userId],
    queryFn: () => getFollowing(userId),
  });

  return { following, isLoadingFollowing };
}

export function useFollowers() {
  const { userId } = useParams();

  const { data: followers, isLoading: isLoadingFollowers } = useQuery({
    queryKey: ["followers", userId],
    queryFn: () => getFollowers(userId),
  });

  return { followers, isLoadingFollowers };
}

export function useTopCreators() {
  const { data: topCreators, isLoading: isLoadingCreators } = useQuery({
    queryKey: ["topCreators"],
    queryFn: getTopCreators,
  });

  return { topCreators, isLoadingCreators };
}
