import { Outlet } from "react-router";
import { PlaybackBar } from "@/components/PlaybackBar";
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
