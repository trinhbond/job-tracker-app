import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Home, Applications, Profile } from "./pages";
import { Box } from "@mui/material";
import { Loading } from "./components/Loading";
const Layout = lazy(() => import("./components/Layout"));

export default function App() {
  const { user } = useContext(AuthContext);

  const FallbackComponent = () => (
    <Box
      sx={{
        bottom: 0,
        left: 0,
        position: "fixed",
        placeContent: "center",
        right: 0,
        textAlign: "center",
        top: 0,
      }}
    >
      <Loading />
    </Box>
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
