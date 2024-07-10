import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  createPost as createPostApi,
  getRecentPosts,
  getSavedPosts,
  toggleSave as toggleSaveApi,
  toggleLikePost as toggleLikePostApi,
} from "@/api/post";

export function useCreatePost() {
  const { mutate: createPost, isPending: isCreatingPost } = useMutation({
    mutationFn: createPostApi,
    onSuccess: (response) => {
      toast(response.message);
    },
    onError: (error: string) => {
      toast(error);
    },
  });

  return { createPost, isCreatingPost };
}

export function useRecentPosts() {
  const { data: recentPosts, isLoading: isLoadingPosts } = useQuery({
    queryFn: getRecentPosts,
    queryKey: ["recent-posts"],
  });

  return { recentPosts, isLoadingPosts };
}

export function useToggleSave() {
  const queryClient = useQueryClient();

  const { mutate: toggleSave, isPending: isTogglingSave } = useMutation({
    mutationFn: toggleSaveApi,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["saved-posts"] });
      toast(response.message);
    },
    onError: (error: string) => {
      toast(error);
    },
  });

  return { toggleSave, isTogglingSave };
}

export function useSavedPosts() {
  const { data: savedPosts, isLoading: isLoadingSavedPosts } = useQuery({
    queryKey: ["saved-posts"],
    queryFn: getSavedPosts,
  });

  return { savedPosts, isLoadingSavedPosts };
}

export function useToggleLikePost() {
  const queryClient = useQueryClient();

  const { mutate: toggleLikePost, isPending: isTogglingLike } = useMutation({
    mutationFn: toggleLikePostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recent-posts"] });
      queryClient.invalidateQueries({ queryKey: ["saved-posts"] });
    },
    onError: (error: string) => {
      toast(error);
    },
  });

  return { toggleLikePost, isTogglingLike };
}
