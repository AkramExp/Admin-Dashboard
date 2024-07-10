import { useToggleSave } from "@/react-query/post";
import { IPost } from "@/types";

type PostStatsProps = {
  post: IPost;
  userId: string;
  isSaved: boolean;
};

const PostStats = ({ post, userId, isSaved }: PostStatsProps) => {
  const { toggleSave } = useToggleSave();

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src="/assets/icons/like.svg"
          alt="like"
          width={20}
          height={20}
          onClick={() => {}}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">0</p>
      </div>
      <div className="flex">
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
