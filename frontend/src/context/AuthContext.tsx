import { getCurrentUser } from "@/api/user";
import { useCurrentUser } from "@/react-query/user";
import { IContextType, IUser } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const initialUser = {
  _id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

const initialState = {
  user: initialUser,
  isLoadingUser: false,
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext<IContextType>(initialState);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { currentUser, isLoadingUser } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoadingUser && !currentUser) {
      navigate("/sign-in");
    }

    checkAuthUser();
  }, []);

  const checkAuthUser = async () => {
    try {
      if (currentUser) {
        setIsAuthenticated(true);

        return true;
      }

      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const value = {
    user: currentUser,
    isLoadingUser,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext);
