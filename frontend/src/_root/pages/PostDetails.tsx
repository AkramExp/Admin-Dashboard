import Loader from "@/components/shared/Loader";
import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { multiFormatDateString } from "@/lib/utils";
import { useDeletePost, usePost, useToggleLikePost } from "@/react-query/post";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PostDetails = () => {
  const { post, isLoadingPost } = usePost();
  const { user } = useUserContext();
  const { deletePost } = useDeletePost();
  const { toggleLikePost } = useToggleLikePost();
  const [clickTimeout, setClickTimeout] = useState(0);

  useEffect(() => {
    return () => {
      if (clickTimeout) {
        clearTimeout(clickTimeout);
      }
    };
  }, [clickTimeout]);

  const handleClick = (postId: string) => {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(0);
      handleDoubleClick(postId);
    } else {
      const timeout = setTimeout(() => {
        setClickTimeout(0);
      }, 250);
      setClickTimeout(timeout);
    }
  };

  const handleDoubleClick = (postId: string) => {
    toggleLikePost(postId);
  };

  if (isLoadingPost) return <Loader />;

  const isSaved = Boolean(
    user?.savedPosts.find((postId) => postId === post._id)
  );

  const isLiked = Boolean(
    post.likes.find((userId: string) => userId === user?._id)
  );

  return (
    <div className="post_details-container">
      {isLoadingPost ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img
            src={post.imageUrl}
            alt="post"
            className="post_details-img"
            onClick={() => handleClick(post._id)}
          />
          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post.user._id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={
                    post.user.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="rounded-full w-8 h-8 lg:w-12 lg:h-12"
                />

                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post.user.name}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular">
                      {multiFormatDateString(post.createdAt)}
                    </p>
                    -
                    <p className="subtle-semibold lg:small-regular">
                      {post.location}
                    </p>
                  </div>
                </div>
              </Link>
              {user?._id === post.user._id && (
                <div className="flex-center">
                  <Link to={`update-post/${post._id}`}>
                    <img
                      src="/assets/icons/edit.svg"
                      alt="edit"
                      width={24}
                      height={24}
                    />
                  </Link>

                  <Button
                    variant="ghost"
                    className="ghost_details-delete-btn"
                    onClick={() => deletePost(post._id)}
                  >
                    <img
                      src="/assets/icons/delete.svg"
                      alt="delete"
                      width={24}
                      height={24}
                    />
                  </Button>
                </div>
              )}
            </div>

            <hr className="border w-full border-dark-4/80" />

            <div className="flex flex-col flex-1 small-medium lg:base-medium">
              <p>{post.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post.tags.map((tag: string) => (
                  <li key={tag} className="text-light-3">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              <PostStats post={post} isSaved={isSaved} isLiked={isLiked} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
