import { useTopCreators } from "@/react-query/user";
import Loader from "./Loader";
import UserCard from "./UserCard";
import { useUserContext } from "@/context/AuthContext";
import { useState } from "react";

const RightSidebar = () => {
  const { topCreators, isLoadingCreators } = useTopCreators();
  const { user: currentUser } = useUserContext();
  const [following, setFollowing] = useState<string[]>(currentUser?.following);

  function isFollowing(userId: string) {
    return Boolean(following.find((followId) => followId === userId));
  }

  return (
    <div className="rightsidebar">
      <h3 className="h3-bold">Top Creators</h3>
      {isLoadingCreators ? (
        <div className="h-[80vh] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 mt-6">
          {topCreators.map((creator: any) => (
            <UserCard
              key={creator._id}
              user={creator}
              isFollowing={isFollowing(creator._id)}
              following={following}
              setFollowing={setFollowing}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RightSidebar;
