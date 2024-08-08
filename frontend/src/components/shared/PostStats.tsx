import { useUserContext } from "@/context/AuthContext";
import { useToggleLikePost, useToggleSave } from "@/react-query/post";
import { IPost } from "@/types";
import { useState } from "react";

type PostStatsProps = {
  post: IPost;
  isSaved: boolean;
  isLiked: boolean;
};

const PostStats = ({ post, isSaved }: PostStatsProps) => {
  const { toggleLikePost } = useToggleLikePost();
  const { toggleSave } = useToggleSave();
  const { user } = useUserContext();

  const isLiked = Boolean(
    post.likes.find((userId: string) => userId === user?._id)
  );

  const [likes, setLikes] = useState<string[]>(post.likes);

  const handleLikePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    let likesArray = [...likes];

    if (likesArray.includes(user._id)) {
      likesArray = likesArray.filter((Id) => Id !== user._id);
    } else {
      likesArray.push(user._id);
    }

    setLikes(likesArray);
    toggleLikePost(post._id);
  };

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex items-center gap-2 mr-5">
        <img
          src={`/assets/icons/${isLiked ? "liked" : "like"}.svg`}
          alt="like"
          width={25}
          height={25}
          onClick={(e) => {
            handleLikePost(e);
          }}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{post.likes.length}</p>
      </div>
      <div className="flex ml-5">
        <img
          src={`/assets/icons/${isSaved ? "saved" : "save"}.svg`}
          alt="like"
          width={25}
          height={25}
          onClick={() => {
            toggleSave(post._id);
          }}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PostStats;
