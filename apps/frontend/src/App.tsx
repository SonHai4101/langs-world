import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import { Theme } from "@radix-ui/themes";

function App() {
  return (
    <div>
      <Theme>
        <Outlet />
        <ToastContainer position="top-right" autoClose={3000} />
      </Theme>
    </div>
  );
}

export default App;
