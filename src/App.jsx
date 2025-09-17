import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import Sidebar from "./pages/global/Sidebar.jsx";
import Topbar from "./pages/global/Topbar.jsx";
import { lazy, Suspense } from "react";
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Posts = lazy(() => import("./pages/Posts.jsx"));
const About = lazy(() => import("./pages/About.jsx"));

// route prefetchers (can be imported elsewhere if needed)
export const preloadDashboard = () => import("./pages/Dashboard.jsx");
export const preloadPosts = () => import("./pages/Posts.jsx");
export const preloadAbout = () => import("./pages/About.jsx");
import { NotificationProvider } from "./context/NotificationContext.jsx";
import NotificationContainer from "./components/utilities/NotificationContainer.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import "./App.css";
import Login from "./pages/Login.jsx";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NotificationProvider>
          <BrowserRouter>
            {/* idle prefetch for common routes */}
            <PrefetchOnIdle />
            <Suspense fallback={<RouteSpinner /> }>
              <Routes>
                <Route element={<AppLayout />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/posts" element={<Posts />} />
                  <Route path="/about" element={<About />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
            <NotificationContainer />
          </BrowserRouter>
        </NotificationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

function PrefetchOnIdle() {
  useEffect(() => {
    const idle = (cb) => {
      if ("requestIdleCallback" in window) {
        // @ts-ignore
        return window.requestIdleCallback(cb, { timeout: 2000 });
      }
      return setTimeout(cb, 1000);
    };
    const id = idle(() => {
      preloadPosts();
      preloadAbout();
    });
    return () => {
      if ("cancelIdleCallback" in window) {
        // @ts-ignore
        window.cancelIdleCallback(id);
      } else {
        clearTimeout(id);
      }
    };
  }, []);
  return null;
}

function AppLayout() {
  const { isAuthenticated, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem("sidebar-open");
    return saved !== null ? JSON.parse(saved) : false;
  });
  const [sidebarTransitioning, setSidebarTransitioning] = useState(false);
  const transitionTimerRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("sidebar-open", JSON.stringify(sidebarOpen));
  }, [sidebarOpen]);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  const withSidebarTransition = (action) => {
    setSidebarTransitioning(true);
    action();
    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    transitionTimerRef.current = setTimeout(() => {
      setSidebarTransitioning(false);
    }, 320);
  };

  const handleToggleSidebar = () => {
    withSidebarTransition(() => setSidebarOpen((v) => !v));
  };

  const handleCloseSidebar = () => {
    withSidebarTransition(() => setSidebarOpen(false));
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg-primary)",
        }}
      >
        <div className="spinner" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  const shellClass = [
    "app-shell",
    sidebarOpen && "show-sidebar",
    !sidebarOpen && "collapsed",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={shellClass}>
      <Sidebar />
      <Topbar
        sidebar={shellClass}
        onToggleSidebar={handleToggleSidebar}
      />
      <div className="sidebar-backdrop" onClick={handleCloseSidebar} />
      <main className="main">
        {sidebarTransitioning ? (
          <RouteSpinner />
        ) : (
          <Suspense fallback={<RouteSpinner /> }>
            <Outlet />
          </Suspense>
        )}
      </main>
    </div>
  );
}

function RouteSpinner() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: "100%",
        display: "grid",
        placeItems: "center",
        background: "transparent",
      }}
    >
      <div className="spinner" />
    </div>
  );
}
