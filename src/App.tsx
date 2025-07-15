import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Header from "./components/Header";
import { useContext, useEffect } from "react";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { Applications, Home, Profile } from "./pages";

function Layout() {
  return (
    <AuthProvider>
      <Header />
      <Outlet />
    </AuthProvider>
  );
}

function App() {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (location.pathname === "/") {
        navigate("/profile", { replace: true });
      }
    }
  }, [user]);

  return (
    <Routes>
      <Route path="/" index element={<Home />} />
      <Route element={<Layout />}>
        <Route path="profile" element={<Profile />} />
        <Route path="applications" element={<Applications />} />
        <Route path="*" element={<>Not Found</>} />
      </Route>
      <Route path="*" element={<>Not Found</>} />
    </Routes>
  );
}

export default App;
