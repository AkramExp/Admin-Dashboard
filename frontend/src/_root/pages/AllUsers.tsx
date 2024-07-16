import UserCard from "@/components/shared/UserCard";
import { Input } from "@/components/ui/input";
import { useUserContext } from "@/context/AuthContext";
import { useAllUsers } from "@/react-query/user";
import { Loader } from "lucide-react";
import { useState } from "react";

const AllUsers = () => {
  const { allUsers, isLoadingAllUsers } = useAllUsers();
  const [searchValue, setSearchValue] = useState("");
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
          <h2 className="h3-bold md:h2-bold w-full">Search Users</h2>
          <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
            <img
              src="/assets/icons/search.svg"
              width={24}
              height={24}
              alt="search"
            />
            <Input
              type="text"
              placeholder="Search"
              className="explore-search"
              value={searchValue}
              onChange={(e) => {
                const { value } = e.target;
                setSearchValue(value);
              }}
            />
          </div>
        </div>
        {isLoadingAllUsers ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {allUsers.map((user: any) => {
              if (user._id !== currentUser?._id)
                return (
                  <li key={user?._id} className="flex-1 min-w-[200px] w-full">
                    <UserCard user={user} isFollowing={isFollowing(user._id)} />
                  </li>
                );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
