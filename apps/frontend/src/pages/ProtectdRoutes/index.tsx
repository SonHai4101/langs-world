import { Outlet, useLocation } from "react-router";
import { Navbar } from "@/components/NavBar";

export const index = () => {
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "";

  return (
    <div>
      <Navbar isHome={isHome} />
      <Outlet />
    </div>
  );
};
