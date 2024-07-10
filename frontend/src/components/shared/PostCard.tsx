import { useUserContext } from "@/context/AuthContext";
import { formatDate } from "@/lib/utils";
import { IPost } from "@/types";
import { Link, useNavigate } from "react-router-dom";
import PostStats from "./PostStats";
import { useToggleLikePost } from "@/react-query/post";
import { useEffect, useState } from "react";

type PostCardProps = {
  post: IPost;
};

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();
  const { toggleLikePost } = useToggleLikePost();
  const [clickTimeout, setClickTimeout] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (clickTimeout) {
        clearTimeout(clickTimeout);
      }
    };
  }, [clickTimeout]);

  const handleClick = () => {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(0);
      handleDoubleClick();
    } else {
      const timeout = setTimeout(() => {
        handleSingleClick();
        setClickTimeout(0);
      }, 250);
      setClickTimeout(timeout);
    }
  };

  const handleSingleClick = () => {
    navigate(`/posts/${post._id}`);
  };

  const handleDoubleClick = () => {
    toggleLikePost(post._id);
  };

  const isSaved = Boolean(
    user?.savedPosts.find(
      (savedPost: { postId: string; userId: string }) =>
        savedPost.postId === post._id
    )
  );

  const isLiked = Boolean(
    post.likes.find((userId: string) => userId === user?._id)
  );

  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.user._id}`}>
            <img
              src={
                post.user.imageUrl || "/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
              className="rounded-full w-12 lg:h-12"
            />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {post.user.name}
            </p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular">
                {formatDate(post.createdAt)}
              </p>
              -
              <p className="subtle-semibold lg:small-regular">
                {post.location}
              </p>
            </div>
          </div>
        </div>
        <Link
          to={`/update-post/${post._id}`}
          className={`${user?._id !== post.user._id && "hidden"}`}
        >
          <img src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
        </Link>
      </div>

      <div>
        <div className="small-medium lg:base-medium py-5">
          <p>{post.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag: string) => (
              <li key={tag} className="text-light-3">
                #{tag}
              </li>
            ))}
          </ul>
        </div>

        <img
          src={post.imageUrl || "/assets/icons/profile-placeholder.svg"}
          alt="post image"
          className="post-card_img"
          onClick={() => handleClick()}
        />
      </div>

      <PostStats post={post} isSaved={isSaved} isLiked={isLiked} />
    </div>
  );
};

export default PostCard;
