import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Topbar from "@/components/shared/Topbar";
import { useCurrentUser } from "@/react-query/user";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  const { currentUser, isLoadingUser } = useCurrentUser();
  if (isLoadingUser)
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center gap-6">
        <img src="/assets/images/logo.svg" alt="logo" width={170} height={36} />
        <h1 className="text-3xl font-semibold font-serif">Loading...</h1>
      </div>
    );

  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar />

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

      <Bottombar />
    </div>
  );
};

export default RootLayout;
