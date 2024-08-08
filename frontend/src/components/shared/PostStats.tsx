import { useUserContext } from "@/context/AuthContext";
import { useToggleLikePost, useToggleSave } from "@/react-query/post";
import { IPost } from "@/types";

type PostStatsProps = {
  post: IPost;
  isSaved: boolean;
  // isLiked: boolean;
  likes: string[];
  setLikes: React.Dispatch<React.SetStateAction<string[]>>;
};

const PostStats = ({ post, isSaved, likes, setLikes }: PostStatsProps) => {
  const { toggleLikePost } = useToggleLikePost();
  const { toggleSave } = useToggleSave();
  const { user } = useUserContext();

  // const [likes, setLikes] = useState<string[]>(post.likes);

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

  const isLiked = Boolean(
    likes?.find((userId: string) => userId === user?._id)
  );

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex items-center gap-2 mr-5">
        <img
          src={`/assets/icons/${isLiked ? "liked" : "like"}.svg`}
          alt="like"
          width={25}
          height={25}
          onClick={() => {
            handleLikePost();
          }}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likes?.length}</p>
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
