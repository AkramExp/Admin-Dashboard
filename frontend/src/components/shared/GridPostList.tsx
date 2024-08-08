import { IPost } from "@/types";
import GridPostCard from "./GridPostCard";

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
  return (
    <ul className="grid-container">
      {posts.map((post: IPost) => (
        <GridPostCard
          post={post}
          showUser={showUser}
          showStats={showStats}
          key={post._id}
        />
      ))}
    </ul>
  );
};

export default GridPostList;
