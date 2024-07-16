import { Link } from "react-router-dom";

import { Button } from "../ui/button";
import { IUser } from "@/types";
import { useToggleFollow } from "@/react-query/user";

type UserCardProps = {
  user: IUser;
  isFollowing: boolean;
  showButton: boolean;
};

const FollowCard = ({
  user,
  isFollowing = false,
  showButton,
}: UserCardProps) => {
  const { toggleFollow, isTogglingFollow } = useToggleFollow();
  console.log(showButton);

  return (
    <Link
      to={`/profile/${user._id}`}
      className="flex justify-between items-center border border-dark-4 rounded-[20px] px-5 py-4"
    >
      <div className="flex items-center gap-4">
        <img
          src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
          alt="creator"
          className="rounded-full w-10 h-10 lg:w-12 lg:h-12 object-cover"
        />

        <div className="flex items-start flex-col gap-1">
          <p className="base-medium text-light-1 text-center line-clamp-1">
            {user.name}
          </p>
          <p className="small-regular text-light-3 text-center line-clamp-1">
            @{user.username}
          </p>
        </div>
      </div>

      {showButton && (
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
      )}
    </Link>
  );
};

export default FollowCard;
