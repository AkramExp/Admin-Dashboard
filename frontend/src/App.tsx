import { Route, Routes } from "react-router-dom";
import "./globals.css";
import SigninForm from "./_auth/forms/SigninForm";
import {
  AllUsers,
  CreatePost,
  EditPost,
  Explore,
  Home,
  PostDetails,
  Profile,
  Saved,
  UpdateProfile,
} from "./_root/pages";
import SignupForm from "./_auth/forms/SignupForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import FollowingList from "./_root/pages/FollowingList";
import FollowersList from "./_root/pages/FollowersList";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* Private Routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<EditPost />} />
          <Route path="/posts/:postId" element={<PostDetails />} />
          <Route path="/profile/:userId/*" element={<Profile />} />
          <Route path="/update-profile/:userId" element={<UpdateProfile />} />
          <Route
            path="/profile/:userId/following"
            element={<FollowingList />}
          />
          <Route
            path="/profile/:userId/followers"
            element={<FollowersList />}
          />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
