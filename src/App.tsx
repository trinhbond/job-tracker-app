import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Home, Applications, Profile } from "./pages";
import { CircularProgress } from "@mui/material";
const Layout = lazy(() => import("./components/Layout"));

export default function App() {
  const { user } = useContext(AuthContext);

  const FallbackComponent = () => (
    <div className="place-content-center text-center fixed left-0 right-0 top-0 bottom-0">
      <CircularProgress
        sx={{
          color: document.documentElement.classList.contains("dark")
            ? "#fff"
            : "#000",
        }}
      />
    </div>
  );

  return (
    <Routes>
      <Route
        path="/"
        index
        element={user ? <Navigate to="/profile" replace /> : <Home />}
      />
      <Route
        element={
          <Suspense fallback={<FallbackComponent />}>
            <Layout />
          </Suspense>
        }
      >
        <Route path="profile" element={<Profile />} />
        <Route path="applications" element={<Applications />} />
        <Route path="*" element={<>Not Found</>} />
      </Route>
      <Route path="*" element={<>Not Found</>} />
    </Routes>
  );
}
