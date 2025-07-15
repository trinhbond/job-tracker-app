import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Home, Applications, Profile } from "./pages";

export default function App() {
  const { user } = useContext(AuthContext);

  function Layout() {
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        index
        element={user ? <Navigate to="/profile" replace /> : <Home />}
      />
      <Route element={<Layout />}>
        <Route path="profile" element={<Profile />} />
        <Route path="applications" element={<Applications />} />
        <Route path="*" element={<>Not Found</>} />
      </Route>
      <Route path="*" element={<>Not Found</>} />
    </Routes>
  );
}
