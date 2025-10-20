import { createContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../config/firebase";

export const AuthContext = createContext({
  user: {} as User | null,
  setUser: (_user: User | null) => {},
  signOutUser: () => {},
  loading: true as boolean,
});

export const AuthProvider = ({ children }: { children?: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signOutUser, loading }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
