import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useUserLikedPosts } from "@/react-query/post";

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
