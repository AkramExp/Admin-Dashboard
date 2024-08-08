import { IPost } from "@/types";
import { useNavigate } from "react-router-dom";
import PostStats from "./PostStats";
import { useUserContext } from "@/context/AuthContext";
import { useToggleLikePost } from "@/react-query/post";
import { useEffect, useState } from "react";

interface GridPostCardProps {
  post: IPost;
  showUser: Boolean;
  showStats: Boolean;
}

const GridPostCard = ({ post, showUser, showStats }: GridPostCardProps) => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const { toggleLikePost } = useToggleLikePost();
  const [clickTimeout, setClickTimeout] = useState(0);
  const [likes, setLikes] = useState<string[]>(post.likes);

  const handleLikePost = () => {
    let likesArray = [...likes];

    if (likesArray.includes(user._id)) {
      likesArray = likesArray.filter((Id) => Id !== user._id);
    } else {
      likesArray.push(user._id);
    }

    setLikes(likesArray);
    toggleLikePost(post._id);
  };

  useEffect(() => {
    return () => {
      if (clickTimeout) {
        clearTimeout(clickTimeout);
      }
    };
  }, [clickTimeout]);

  const handleSingleClick = (postId: string) => {
    navigate(`/posts/${postId}`);
  };

  const handleDoubleClick = () => {
    handleLikePost();
  };

  //   function isLiked(post: IPost) {
  //     return Boolean(post?.likes.find((like) => like === user?._id));
  //   }

  function isSaved(post: IPost) {
    return Boolean(user?.savedPosts.find((postId) => postId === post._id));
  }

  const handleClick = (postId: string) => {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(0);
      handleDoubleClick();
    } else {
      const timeout = setTimeout(() => {
        handleSingleClick(postId);
        setClickTimeout(0);
      }, 250);
      setClickTimeout(timeout);
    }
  };

  return (
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
                post.user.imageUrl || "/assets/icons/profile-placeholder.svg"
              }
              alt="user"
              className="h-8 w-8 rounded-full object-cover"
            />
            <p className="line-clamp-1">{post.user.name}</p>
          </div>
        )}
        {showStats && (
          <PostStats
            post={post}
            likes={likes}
            setLikes={setLikes}
            // isLiked={isLiked(post)}
            isSaved={isSaved(post)}
          />
        )}
      </div>
    </li>
  );
};

export default GridPostCard;
