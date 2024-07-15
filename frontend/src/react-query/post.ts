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
  getAllPosts,
  getUserPosts,
  getUserLikedPosts,
} from "@/api/post";
import { useParams } from "react-router-dom";

export function useCreatePost() {
  const queryClient = useQueryClient();

  const { mutate: createPost, isPending: isCreatingPost } = useMutation({
    mutationFn: createPostApi,
    onSuccess: (response) => {
      toast(response.message);
      queryClient.invalidateQueries({ queryKey: ["recent-posts"] });
      queryClient.invalidateQueries({ queryKey: ["saved-posts"] });
      queryClient.invalidateQueries({ queryKey: ["all-posts"] });
      queryClient.invalidateQueries({ queryKey: ["user-posts"] });
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
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
      queryClient.invalidateQueries({ queryKey: ["saved-posts"] });
      queryClient.invalidateQueries({ queryKey: ["all-posts"] });
      queryClient.invalidateQueries({ queryKey: ["user-posts"] });
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
      queryClient.invalidateQueries({ queryKey: ["all-posts"] });
      queryClient.invalidateQueries({ queryKey: ["post"] });
      queryClient.invalidateQueries({ queryKey: ["user-posts"] });
      queryClient.invalidateQueries({ queryKey: ["liked-posts"] });
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
      queryClient.invalidateQueries({ queryKey: ["user-posts"] });
    },
    onError: (error: string) => {
      toast(error);
    },
  });

  return { updatePost, isUpdatingPost };
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  const { mutate: deletePost, isPending: isDeletingPost } = useMutation({
    mutationFn: deletePostApi,
    onSuccess: (response) => {
      toast(response.message);
      queryClient.invalidateQueries({ queryKey: ["recent-posts"] });
      queryClient.invalidateQueries({ queryKey: ["saved-posts"] });
      queryClient.invalidateQueries({ queryKey: ["all-posts"] });
      queryClient.invalidateQueries({ queryKey: ["user-posts"] });
      window.history.go(-1);
    },
    onError: (error: string) => {
      toast(error);
    },
  });

  return { deletePost, isDeletingPost };
}

export function useAllPosts() {
  const { data: allPosts, isLoading: isLoadingAllPosts } = useQuery({
    queryKey: ["all-posts"],
    queryFn: getAllPosts,
  });

  return { allPosts, isLoadingAllPosts };
}

export function useUserPosts() {
  const { userId } = useParams();

  const { data: userPosts, isLoading: isLoadingUserPosts } = useQuery({
    queryKey: ["user-posts", userId],
    queryFn: () => getUserPosts(userId),
  });

  return { userPosts, isLoadingUserPosts };
}

export function useUserLikedPosts() {
  const { data: likedPosts, isLoading: isLoadingLikedPosts } = useQuery({
    queryKey: ["liked-posts"],
    queryFn: getUserLikedPosts,
  });

  return { likedPosts, isLoadingLikedPosts };
}
