import { Link } from "react-router-dom";

import { Button } from "../ui/button";
import { IUser } from "@/types";
import { useToggleFollow } from "@/react-query/user";

type UserCardProps = {
  user: IUser;
  isFollowing: boolean;
};

const UserCard = ({ user, isFollowing = false }: UserCardProps) => {
  const { toggleFollow, isTogglingFollow } = useToggleFollow();

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
          toggleFollow(user._id);
        }}
        disabled={isTogglingFollow}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </Link>
  );
};

export default UserCard;
