import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createPost as createPostApi, getRecentPosts } from "@/api/post";

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
