import { IPost } from "@/types";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";
import { useUserContext } from "@/context/AuthContext";

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
          <Link to={`/posts/${post._id}`} className="grid-post_link">
            <img
              src={post.imageUrl}
              alt="post"
              className="h-full w-full object-cover"
            />
          </Link>
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
