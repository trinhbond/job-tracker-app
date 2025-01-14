import { User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { signOutUser, userStateListener } from "../config/firebase";
import { createContext, useState, useEffect, ReactNode } from "react";

export const AuthContext = createContext({
  user: {} as User | null,
  setUser: (_user: User) => {},
  signOut: () => {},
});

export const AuthProvider = ({ children }: { children?: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = userStateListener((user) => {
      if (user) {
        setUser(user);
      } else {
        navigate("/");
      }
    });

    return unsubscribe;
  }, [user, setUser, navigate]);

  const signOut = () => {
    signOutUser();
    setUser(null);
    navigate("/");
    window.location.reload();
  };

  const value = {
    user,
    setUser,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
