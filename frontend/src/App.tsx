import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import Loader from "react-spinners/ClipLoader";

import "./index.css";

import Dashboard from "./pages/Dashboard";
// import Guide from "./pages/Guide";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
// import Network from "./pages/Network";
// import Tools from "./pages/Tools";
// import Seeds from "./pages/Seeds";
import Layout from "./pages/Layout";
import Auth from "./pages/Auth";
// import MySpace from "./pages/MySpace";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider, useTheme } from "./contexts/theme-provider";
import { getToken } from "./utils/utils";
import { verifyAccessToken } from "./api/api-services/auth";
import ActivateAccount from "./pages/ActivateAccount";

interface ProtectedRouteProps {
  element: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = getToken();
      if (!token) {
        navigate("/");
        return;
      }
      const isValid = await verifyAccessToken(token);
      setIsAuthenticated(isValid);
      setLoading(false);
      if (!isValid) {
        navigate("/");
      }
    };

    checkAuthentication();
  }, [navigate]);

  if (loading) {
    return (
      <div className="">
        <Loader
          loading={loading}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
          color={theme === "dark" ? "white" : "slate-900"}
        />
      </div>
    );
  }

  return isAuthenticated ? <>{element}</> : null;
};

const App = () => {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/auth/login",
        element: <Auth />,
      },
      {
        path: "/auth/register",
        element: <Auth />,
      },
      {
        path: "/auth/activation/:uid/:token",
        element: <ActivateAccount />,
      },
      {
        element: <Layout />,
        children: [
          {
            path: "me/dashboard",
            element: <ProtectedRoute element={<Dashboard />} />,
          },
          // {
          //   path: "me/seeds",
          //   element: <ProtectedRoute element={<Seeds />} />,
          // },
          // {
          //   path: "me/myspace",
          //   element: <ProtectedRoute element={<MySpace />} />,
          // },

          // {
          //   path: "me/guide",
          //   element: <ProtectedRoute element={<Guide />} />,
          // },
          // {
          //   path: "me/tools",
          //   element: <ProtectedRoute element={<Tools />} />,
          // },
          // {
          //   path: "/network",
          //   element: <ProtectedRoute element={<Network />} />,
          // },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
    {
      future: {
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      },
    }
  );
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <RouterProvider
          router={router}
          future={{
            v7_startTransition: true,
          }}
        />
        <Toaster />
      </ThemeProvider>
    </>
  );
};

export default App;
