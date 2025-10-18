import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { createContext, useState, useEffect, ReactNode } from "react";

export const AuthContext = createContext({
  user: {} as User | null,
  setUser: (_user: User | null) => {},
  signOutUser: () => {},
  loading: true as boolean,
});

export const AuthProvider = ({ children }: { children?: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signOutUser = () => {
    signOut(auth);
    setUser(null);
    navigate("/");
  };

  const value = {
    user,
    setUser,
    signOutUser,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
