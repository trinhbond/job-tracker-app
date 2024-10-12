import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";

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
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="profile" element={user ? <Profile /> : <Home />} />
        <Route path="*" element={<>Not Found</>} />
      </Route>
    </Routes>
  );
}

export default App;
