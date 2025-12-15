import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Fallback } from "./components/Fallback";
import { Dashboard, NotFound } from "./pages";
import { ThemeProvider } from "./context/ThemeContext";
import { CssBaseline, GlobalStyles } from "@mui/material";

const Layout = lazy(() => import("./components/Layout"));
const Home = lazy(() => import("./pages/Home"));

export default function App() {
  return (
    <Suspense fallback={<Fallback />}>
      <Router>
        <ThemeProvider>
          <CssBaseline />
          <GlobalStyles
            styles={(theme) => ({
              body: {
                background:
                  theme.palette.mode === "dark"
                    ? theme.palette.primary.dark
                    : theme.palette.primary.light,
              },
            })}
          />
          <AuthProvider>
            <ToastContainer limit={10} />
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" index element={<Home />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </AuthProvider>
        </ThemeProvider>
      </Router>
    </Suspense>
  );
}
