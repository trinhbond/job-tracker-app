import { Outlet, Route, Routes, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { Suspense, useContext } from "react";
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

  return (
    <Routes>
      <Route
        path="/"
        index
        element={user ? <Navigate to="user/profile" /> : <Home />}
      />
      <Route
        path="user"
        element={
          <Suspense fallback={<>loading...</>}>
            <Layout />
          </Suspense>
        }
      >
        <Route path="profile" element={<Profile />} />
        <Route path="applications" element={<Content />} />
        <Route path="*" element={<>Not Found</>} />
      </Route>
      <Route path="*" element={<>Not Found</>} />
    </Routes>
  );
}

export default App;
