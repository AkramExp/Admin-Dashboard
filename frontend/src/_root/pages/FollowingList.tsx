import FollowCard from "@/components/shared/FollowCard";
import Loader from "@/components/shared/Loader";
import { useUserContext } from "@/context/AuthContext";
import { useFollowing } from "@/react-query/user";

const FollowingList = () => {
  const { following, isLoadingFollowing } = useFollowing();
  const { user: currentUser } = useUserContext();

  function isFollowing(userId: string) {
    return Boolean(
      currentUser?.following.find((followId) => followId === userId)
    );
  }

  return (
    <div className="common-container">
      <div className="user-container">
        <div className="explore-inner_container">
          <h2 className="h3-bold md:h2-bold w-full">Following List</h2>
        </div>
        {isLoadingFollowing ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {following.map((user: any) => {
              return (
                <li key={user?._id} className="flex-1 min-w-[200px] w-full">
                  <FollowCard
                    user={user}
                    isFollowing={isFollowing(user._id)}
                    showButton={user._id !== currentUser?._id}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FollowingList;
