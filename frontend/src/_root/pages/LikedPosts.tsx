import GridPostList from "@/components/shared/GridPostList";
import { useUserLikedPosts } from "@/react-query/post";
import { Loader } from "lucide-react";

const LikedPosts = () => {
  const { likedPosts, isLoadingLikedPosts } = useUserLikedPosts();

  if (isLoadingLikedPosts) return <Loader />;

  return (
    <>
      {likedPosts.length === 0 && (
        <p className="text-light-4">No liked posts</p>
      )}

      <GridPostList posts={likedPosts} showStats={false} />
    </>
  );
};

export default LikedPosts;
