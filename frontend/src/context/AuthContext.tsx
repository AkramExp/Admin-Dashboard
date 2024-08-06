import { useCurrentUser } from "@/react-query/user";
import { IContextType } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const initialUser = {
  _id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
  savedPosts: [],
  following: [],
};

const initialState = {
  user: initialUser,
  isLoadingUser: false,
  isAuthenticated: false,
  setIsAuthenticated: () => {},
};

const AuthContext = createContext<IContextType>(initialState);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { currentUser, isLoadingUser } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoadingUser && !currentUser) {
      setIsAuthenticated(false);
      navigate("/sign-in");
    } else {
      setIsAuthenticated(true);
    }
  }, [isLoadingUser, currentUser]);

  const value = {
    user: currentUser,
    isLoadingUser,
    isAuthenticated,
    setIsAuthenticated,
  };
  return (
    <AuthContext.Provider value={value}>
      <>
        {isLoadingUser ? (
          <div className="h-screen w-screen flex flex-col items-center justify-center gap-6">
            <img
              src="/assets/images/logo.svg"
              alt="logo"
              width={170}
              height={36}
            />
            <h1 className="text-3xl font-semibold font-serif">Loading...</h1>
          </div>
        ) : (
          children
        )}
      </>
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);
