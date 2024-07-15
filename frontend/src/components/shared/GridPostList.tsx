import { IPost } from "@/types";
import { useNavigate } from "react-router-dom";
import PostStats from "./PostStats";
import { useUserContext } from "@/context/AuthContext";
import { useToggleLikePost } from "@/react-query/post";
import { useEffect, useState } from "react";

type GridPostListProps = {
  posts: IPost[];
  showUser?: boolean;
  showStats?: boolean;
};

const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
  const { user } = useUserContext();
  const navigate = useNavigate();
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
        handleSingleClick(postId);
        setClickTimeout(0);
      }, 250);
      setClickTimeout(timeout);
    }
  };

  const handleSingleClick = (postId: string) => {
    navigate(`/posts/${postId}`);
  };

  const handleDoubleClick = (postId: string) => {
    toggleLikePost(postId);
  };

  function isLiked(post: IPost) {
    return Boolean(post?.likes.find((like) => like === user?._id));
  }

  function isSaved(post: IPost) {
    return Boolean(user?.savedPosts.find((postId) => postId === post._id));
  }

  return (
    <ul className="grid-container">
      {posts.map((post: IPost) => (
        <li className="relative min-w-80 h-80" key={post._id}>
          <div onClick={() => handleClick(post._id)} className="grid-post_link">
            <img
              src={post.imageUrl}
              alt="post"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid-post_user">
            {showUser && (
              <div className="flex items-center justify-start gap-2 flex-1">
                <img
                  src={
                    post.user.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="user"
                  className="h-8 w-8 rounded-full"
                />
                <p className="line-clamp-1">{post.user.name}</p>
              </div>
            )}
            {showStats && (
              <PostStats
                post={post}
                isLiked={isLiked(post)}
                isSaved={isSaved(post)}
              />
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;
