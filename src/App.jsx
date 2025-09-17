import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import Sidebar from "./pages/global/Sidebar.jsx";
import Topbar from "./pages/global/Topbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Posts from "./pages/Posts.jsx";
import About from "./pages/About.jsx";
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
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/about" element={<About />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <NotificationContainer />
          </BrowserRouter>
        </NotificationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

function AppLayout() {
  const { isAuthenticated, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem("sidebar-open");
    return saved !== null ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("sidebar-open", JSON.stringify(sidebarOpen));
  }, [sidebarOpen]);

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
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
      />
      <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
