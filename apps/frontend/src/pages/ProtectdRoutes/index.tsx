import { Outlet } from "react-router";
import { Navbar } from "@/components/NavBar";

export const index = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
      {/* <PlaybackBar /> */}
    </div>
  );
};
