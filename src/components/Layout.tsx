import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Fallback } from "./Fallback";

export default function Layout() {
  return (
    <Suspense fallback={<Fallback />}>
      <Header />
      <Outlet />
    </Suspense>
  );
}
