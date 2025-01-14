import {
  Outlet,
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import Content from "./pages/Content";

function Layout() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

function App() {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const { pathname } = location;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    if (!user || pathname === "/") {
      setLoading(false);
      return;
    }
    if (user) {
      setLoading(false);
    } else {
      navigate("/");
    }
  }, [user, pathname, navigate]);

  if (loading) return <>loading...</>;

  return (
    <Routes>
      <Route
        path="/"
        index
        element={user ? <Navigate to="user/profile" /> : <Home />}
      />
      <Route path="user" element={<Layout />}>
        <Route path="profile" element={<Profile />} />
        <Route path="content" element={<Content />} />
        <Route path="*" element={<>Not Found</>} />
      </Route>
      <Route path="*" element={<>Not Found</>} />
    </Routes>
  );
}

export default App;
