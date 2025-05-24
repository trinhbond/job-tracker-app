import { Outlet, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Content, Home, Profile } from "./pages";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        index
        element={user ? <Navigate to="/profile" /> : <Home />}
      />
      <Route element={<Layout />}>
        <Route path="profile" element={<Profile />} />
        <Route path="applications" element={<Content />} />
        <Route path="*" element={<>Not Found</>} />
      </Route>
      <Route path="*" element={<>Not Found</>} />
    </Routes>
  );
}

export default App;
