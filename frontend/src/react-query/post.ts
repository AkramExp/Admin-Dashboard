import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createPost as createPostApi } from "@/api/post";

export function useCreatePost() {
  const { mutate: createPost, isPending: isCreatingPost } = useMutation({
    mutationFn: createPostApi,
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });

  return { createPost, isCreatingPost };
}
