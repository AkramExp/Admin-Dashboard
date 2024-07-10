import { useToggleLikePost, useToggleSave } from "@/react-query/post";
import { IPost } from "@/types";

type PostStatsProps = {
  post: IPost;
  isSaved: boolean;
  isLiked: boolean;
};

const PostStats = ({ post, isSaved, isLiked }: PostStatsProps) => {
  const { toggleLikePost } = useToggleLikePost();
  const { toggleSave } = useToggleSave();

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={`/assets/icons/${isLiked ? "liked" : "like"}.svg`}
          alt="like"
          width={20}
          height={20}
          onClick={() => {
            toggleLikePost(post._id);
          }}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{post.likes.length}</p>
      </div>
      <div className="flex ml-5">
        <img
          src={`/assets/icons/${isSaved ? "saved" : "save"}.svg`}
          alt="like"
          width={20}
          height={20}
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
