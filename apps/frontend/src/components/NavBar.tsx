import { Link, useNavigate } from "react-router";
// import { ThemeSwitcher } from "./ThemeSwitcher";
import { LiaPowerOffSolid } from "react-icons/lia";
import useAuthStore from "@/store/useAuthStore";
import { GiWhiteBook } from "react-icons/gi";
import { IoBookOutline } from "react-icons/io5";
import { LuArrowLeft } from "react-icons/lu";

interface NavBarProps {
  isHome?: boolean;
}

export function Navbar({ isHome = true }: NavBarProps) {
  const { logOut } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 w-full border-b z-50 bg-transparent backdrop-blur-2xl">
      <div className="max-w-6xl mx-auto px-6 py-4">
        {isHome ? (
          <div className="flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <Link to="/" className="text-2xl font-extrabold text-primary">
                <GiWhiteBook />
              </Link>
              <div className="flex flex-col">
                <p className="text-2xl font-bold">LangsWorld</p>
                <p className="text-sm font-normal">Learn naturally</p>
              </div>
            </div>

            <div className="flex items-center gap-10">
              <button
                className="flex gap-3 items-center px-4 py-1 rounded-2xl bg-amber-200 hover:bg-amber-300 transition"
                onClick={() => navigate("/saved-word")}
              >
                <IoBookOutline /> My Vocabulary
              </button>

              <div
                className="hidden md:block px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90"
                onClick={handleLogout}
              >
                <LiaPowerOffSolid className="size-5" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-4 justify-between items-center">
            <div className="flex items-center gap-5 text-2xl">
              <button
                className="hover:bg-[#f4eee0] rounded-2xl p-3"
                onClick={() => navigate("/")}
              >
                <LuArrowLeft />
              </button>
              <div className="flex items-center gap-3">
                <IoBookOutline />
                <p className="font-bold">My Vocabulary</p>
              </div>
            </div>
            <p className="font-bold">10 words</p>
          </div>
        )}
      </div>
    </nav>
  );
}
