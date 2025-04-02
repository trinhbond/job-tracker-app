import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { createContext, useState, useEffect, ReactNode } from "react";

export const AuthContext = createContext({
  user: {} as User | null,
  setUser: (_user: User) => {},
  signOutUser: () => {},
  loading: {} as boolean,
});

export const AuthProvider = ({ children }: { children?: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        navigate("/");
      }
    });

    return unsubscribe;
  }, [user, setUser, navigate]);

  const signOutUser = () => {
    signOut(auth);
    setUser(null);
    navigate("/");
    window.location.reload();
  };

  const value = {
    user,
    setUser,
    signOutUser,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
