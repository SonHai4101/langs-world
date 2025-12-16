import { createBrowserRouter } from "react-router";
import App from "../App";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { index } from "../pages/ProtectdRoutes";
import { Dashboard } from "../pages/ProtectdRoutes/Dashboard";
import { ReadingView } from "@/pages/ProtectdRoutes/ReadingView";

export const routes = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        Component: ProtectedRoute,
        children: [
          {
            path: "/",
            Component: index,
            children: [
              {
                path: "",
                Component: Dashboard,
              },
              {
                path: "/read-view",
                Component: ReadingView,
              },
            ],
          },
          {
            path: "/dashboard",
            Component: Dashboard,
          },
        ],
      },
    ],
  },
]);
