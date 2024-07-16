import { Route, Routes, Link, Outlet, useLocation } from "react-router-dom";

import { useUserContext } from "@/context/AuthContext";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import GridPostList from "@/components/shared/GridPostList";
import LikedPosts from "./LikedPosts";
import { useToggleFollow, useUserById } from "@/react-query/user";
import { useUserPosts } from "@/react-query/post";

interface StabBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StabBlockProps) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>
  </div>
);

const Profile = () => {
  const { user } = useUserContext();
  const { pathname } = useLocation();
  const { userPosts, isLoadingUserPosts } = useUserPosts();
  const { currentUser, isLoadingIdUser } = useUserById();
  const { toggleFollow, isTogglingFollow } = useToggleFollow();

  if (isLoadingIdUser || isLoadingUserPosts)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  const isFollowing = Boolean(
    user?.following.find((followId) => followId === currentUser._id)
  );

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={
              currentUser?.imageUrl || "/assets/icons/profile-placeholder.svg"
            }
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full object-cover"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                {currentUser?.name}
              </h1>
              <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                @{currentUser?.username}
              </p>
            </div>

            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={userPosts.length} label="Posts" />
              <Link to={`/profile/${currentUser._id}/followers`}>
                <StatBlock
                  value={currentUser.followerCount}
                  label="Followers"
                />
              </Link>
              <Link to={`/profile/${currentUser._id}/following`}>
                <StatBlock
                  value={currentUser.followingCount}
                  label="Following"
                />
              </Link>
            </div>

            <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
              {currentUser?.bio}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <div className={`${user?._id !== currentUser?._id && "hidden"}`}>
              <Link
                to={`/update-profile/${user?._id}`}
                className={`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg ${
                  user?._id !== currentUser?._id && "hidden"
                }`}
              >
                <img
                  src={"/assets/icons/edit.svg"}
                  alt="edit"
                  width={20}
                  height={20}
                />
                <p className="flex whitespace-nowrap small-medium">
                  Edit Profile
                </p>
              </Link>
            </div>
            <div className={`${user?._id === currentUser._id && "hidden"}`}>
              <Button
                type="button"
                className="shad-button_primary px-8 disabled:cursor-not-allowed"
                onClick={() => toggleFollow(currentUser._id)}
                disabled={isTogglingFollow}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {user?._id === currentUser._id && (
        <div className="flex max-w-5xl w-full">
          <Link
            to={`/profile/${currentUser._id}`}
            className={`profile-tab rounded-l-lg ${
              pathname === `/profile/${currentUser._id}` && "!bg-dark-3"
            }`}
          >
            <img
              src={"/assets/icons/posts.svg"}
              alt="posts"
              width={20}
              height={20}
            />
            Posts
          </Link>
          <Link
            to={`/profile/${currentUser?._id}/liked-posts`}
            className={`profile-tab rounded-r-lg ${
              pathname === `/profile/${currentUser._id}/liked-posts` &&
              "!bg-dark-3"
            }`}
          >
            <img
              src={"/assets/icons/like.svg"}
              alt="like"
              width={20}
              height={20}
            />
            Liked Posts
          </Link>
        </div>
      )}

      <Routes>
        <Route
          index
          element={<GridPostList posts={userPosts} showUser={false} />}
        />
        {user?._id === currentUser._id && (
          <Route path="/liked-posts" element={<LikedPosts />} />
        )}
      </Routes>
      <Outlet />
    </div>
  );
};

export default Profile;
