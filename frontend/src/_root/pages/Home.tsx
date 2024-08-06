import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import RightSidebar from "@/components/shared/RightSidebar";
import { Button } from "@/components/ui/button";
import { useRecentPosts } from "@/react-query/post";
import { IPost } from "@/types";
import { NavLink } from "react-router-dom";

const Home = () => {
  const { recentPosts, isLoadingPosts } = useRecentPosts();

  return (
    <>
      <div className="flex flex-1">
        <div className="home-container">
          <div className="home-posts">
            <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
            {isLoadingPosts ? (
              <Loader />
            ) : (
              <>
                {recentPosts.length === 0 ? (
                  <div className="mt-10 text-light-2 text-lg h-[60vh] flex flex-col items-center justify-center gap-5">
                    Follow your friends to see their Posts
                    <NavLink to="/all-users">
                      <Button className="text-lg bg-primary-500">
                        Follow Now
                      </Button>
                    </NavLink>
                  </div>
                ) : (
                  <ul className="flex flex-col flex-1 gap-9 w-full">
                    {recentPosts?.map((post: IPost, index: number) => (
                      <PostCard post={post} key={index} />
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <RightSidebar />
    </>
  );
};

export default Home;
