import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";
import { PostValidation } from "@/lib/validation";
import { useCreatePost, useUpdatePost } from "@/react-query/post";
import { useNavigate } from "react-router-dom";

const PostForm = ({ post }: any) => {
  const navigate = useNavigate();
  const { createPost, isCreatingPost } = useCreatePost();
  const { updatePost, isUpdatingPost } = useUpdatePost();

  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post.caption : "",
      location: post ? post.location : "",
      tags: post ? post.tags.join(",") : "",
    },
  });

  function onSubmit(values: z.infer<typeof PostValidation>) {
    if (post) {
      const data = {
        caption: values.caption,
        location: values.location,
        tags: values.tags,
        _id: post._id,
      };

      updatePost(data, {
        onSuccess: () => {
          form.reset();
          navigate("/");
        },
      });
    } else {
      createPost(values, {
        onSuccess: () => {
          form.reset();
          navigate("/");
        },
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shadcn-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        {post?.imageUrl ? (
          <div className="flex flex-center flex-col bg-dark-3 rounded-xl p-5 lg:p-10">
            <img
              src={post.imageUrl}
              alt="post image"
              className="file_uploader-img"
            />
          </div>
        ) : (
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shadcn-form_label">Add Photos</FormLabel>
                <FormControl>
                  <FileUploader
                    fieldChange={field.onChange}
                    mediaUrl={post?.imageUrl}
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shadcn-form_label">Add Location</FormLabel>
              <FormControl>
                <Input className="shad-input" type="text" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shadcn-form_label">
                Add Tags ( seperated by comma " , " )
              </FormLabel>
              <FormControl>
                <Input
                  className="shad-input"
                  type="text"
                  placeholder="HTML, CSS, React"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            className="shad-button_dark_4"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isCreatingPost || isUpdatingPost}
          >
            {isCreatingPost || isUpdatingPost ? "Submiting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
