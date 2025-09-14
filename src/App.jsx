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
import "./App.css";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/posts" element={<Posts />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem("sidebar-open");
    return saved !== null ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("sidebar-open", JSON.stringify(sidebarOpen));
  }, [sidebarOpen]);

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
