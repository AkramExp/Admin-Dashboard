import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  createPost as createPostApi,
  getRecentPosts,
  getSavedPosts,
  toggleSave as toggleSaveApi,
  toggleLikePost as toggleLikePostApi,
  getPostById,
  updatePost as updatePostApi,
  deletePost as deletePostApi,
} from "@/api/post";
import { useParams } from "react-router-dom";

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

export function usePost() {
  const { postId } = useParams();

  const { data: post, isLoading: isLoadingPost } = useQuery({
    queryFn: () => getPostById(postId),
    queryKey: ["post", postId],
  });

  return { post, isLoadingPost };
}

export function useUpdatePost() {
  const queryClient = useQueryClient();
  const { postId } = useParams();

  const { mutate: updatePost, isPending: isUpdatingPost } = useMutation({
    mutationFn: updatePostApi,
    onSuccess: (response) => {
      toast(response.message);
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["recent-posts"] });
      queryClient.invalidateQueries({ queryKey: ["saved-posts"] });
    },
    onError: (error: string) => {
      toast(error);
    },
  });

  return { updatePost, isUpdatingPost };
}

export function useDeletePost() {
  const { mutate: deletePost, isPending: isDeletingPost } = useMutation({
    mutationFn: deletePostApi,
    onSuccess: (response) => {
      toast(response.message);
      window.history.go(-1);
    },
    onError: (error: string) => {
      toast(error);
    },
  });

  return { deletePost, isDeletingPost };
}
