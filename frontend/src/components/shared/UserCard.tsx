import { Link } from "react-router-dom";

import { Button } from "../ui/button";
import { IUser } from "@/types";
import { useToggleFollow } from "@/react-query/user";

type UserCardProps = {
  user: IUser;
  isFollowing: boolean;
  following: string[];
  setFollowing: React.Dispatch<React.SetStateAction<string[]>>;
};

const UserCard = ({
  user,
  isFollowing = false,
  following,
  setFollowing,
}: UserCardProps) => {
  const { toggleFollow, isTogglingFollow } = useToggleFollow();

  function handleToggleFollow() {
    let followings = [...following];

    if (followings.includes(user._id)) {
      followings = followings.filter((Id) => Id !== user._id);
    } else {
      followings.push(user._id);
    }

    setFollowing(followings);
    toggleFollow(user._id);
  }

  return (
    <Link to={`/profile/${user._id}`} className="user-card">
      <img
        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
        alt="creator"
        className="rounded-full w-14 h-14 object-cover"
      />

      <div className="flex-center flex-col gap-1">
        <p className="base-medium text-light-1 text-center line-clamp-1">
          {user.name}
        </p>
        <p className="small-regular text-light-3 text-center line-clamp-1">
          @{user.username}
        </p>
      </div>

      <Button
        type="button"
        size="sm"
        className="shad-button_primary px-5 disabled:cursor-not-allowed"
        onClick={(e) => {
          e.preventDefault();
          // toggleFollow(user._id);
          handleToggleFollow();
        }}
        disabled={isTogglingFollow}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </Link>
  );
};

export default UserCard;
