import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useSavedPosts } from "@/react-query/post";

const Saved = () => {
  const { savedPosts, isLoadingSavedPosts } = useSavedPosts();

  if (isLoadingSavedPosts) return <Loader />;

  return (
    <div className="explore-container">
      <div className="flex-between w-full max-w-5xl mb-7">
        <h2 className="h3-bold md:h2-bold w-full">Saved Posts</h2>
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        <GridPostList posts={savedPosts} />
      </div>
    </div>
  );
};

export default Saved;
