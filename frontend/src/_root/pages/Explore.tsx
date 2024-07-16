import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useAllPosts } from "@/react-query/post";

const Explore = () => {
  const { allPosts, isLoadingAllPosts } = useAllPosts();

  if (isLoadingAllPosts) return <Loader />;

  return (
    <div className="explore-container">
      <div className="flex-between w-full max-w-5xl mb-7">
        <h2 className="h3-bold md:h2-bold w-full">Explore Posts</h2>
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        <GridPostList posts={allPosts} />
      </div>
    </div>
  );
};

export default Explore;
