import UserCard from "@/components/shared/UserCard";
import { Input } from "@/components/ui/input";
import { useUserContext } from "@/context/AuthContext";
import { useAllUsers } from "@/react-query/user";
import { useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const AllUsers = () => {
  const { allUsers, isLoadingAllUsers } = useAllUsers();
  const [searchValue, setSearchValue] = useState("");
  const { user: currentUser } = useUserContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  useEffect(() => {
    setSearchParams({});
  }, []);

  function isFollowing(userId: string) {
    return Boolean(
      currentUser?.following.find((followId) => followId === userId)
    );
  }

  function handleSubmit(e: any) {
    e.preventDefault();

    if (searchValue === "") {
      searchParams.delete("search");
    } else {
      searchParams.set("search", searchValue);
    }
    setSearchParams(searchParams);
    setTimeout(() =>
      queryClient.invalidateQueries({ queryKey: ["all-users"] })
    );
  }

  return (
    <div className="common-container">
      <div className="user-container">
        <div className="explore-inner_container">
          <h2 className="h3-bold md:h2-bold w-full">Search Users</h2>
          <form
            className="flex gap-1 px-4 w-full rounded-lg bg-dark-4"
            onSubmit={(e) => handleSubmit(e)}
          >
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
          </form>
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
