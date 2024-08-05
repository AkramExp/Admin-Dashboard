import { useTopCreators } from "@/react-query/user";
import Loader from "./Loader";
import UserCard from "./UserCard";
import { useUserContext } from "@/context/AuthContext";

const RightSidebar = () => {
  const { topCreators, isLoadingCreators } = useTopCreators();
  const { user: currentUser } = useUserContext();

  function isFollowing(userId: string) {
    return Boolean(
      currentUser?.following.find((followId) => followId === userId)
    );
  }

  return (
    <div className="rightsidebar">
      <h3 className="h3-bold">Top Creators</h3>
      {isLoadingCreators ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-2 gap-4 mt-6">
          {topCreators.map((creator: any) => (
            <UserCard
              key={creator._id}
              user={creator}
              isFollowing={isFollowing(creator._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RightSidebar;
