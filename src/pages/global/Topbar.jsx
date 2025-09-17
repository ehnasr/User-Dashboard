import { useTheme } from "../../context/ThemeContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNotification } from "../../context/NotificationContext.jsx";
import { useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { preloadDashboard, preloadPosts, preloadAbout } from "../../App.jsx";
import { lazy, Suspense } from "react";
const SidebarIcon = lazy(() => import("../../components/icons/SidebarIcon.jsx"));
const MoonIcon = lazy(() => import("../../components/icons/MoonIcon.jsx"));
const SunIcon = lazy(() => import("../../components/icons/SunIcon.jsx"));
import "../../App.css";
import LogoutIcon from "../../components/icons/LogoutIcon.jsx";

export default function Topbar({ onToggleSidebar, sidebar }) {
  const { theme, toggle } = useTheme();
  const { logout, user } = useAuth();
  const { success } = useNotification();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const routes = useMemo(
    () => [
      { name: "Dashboard", path: "/", preload: preloadDashboard },
      { name: "Posts", path: "/posts", preload: preloadPosts },
      { name: "About", path: "/about", preload: preloadAbout },
    ],
    []
  );

  const handleLogout = () => {
    logout();
    success("Logged out successfully");
  };

  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setQuery(value);
  }, []);

  const handleSearchFocus = useCallback(() => {
    // warm up route chunks on focus for snappier nav
    routes.forEach((r) => r.preload?.());
  }, [routes]);

  const handleSearchKeyDown = useCallback(
    (e) => {
      if (e.key !== "Enter") return;
      const q = query.trim().toLowerCase();
      if (!q) return;
      const match =
        routes.find((r) => r.name.toLowerCase().startsWith(q)) ||
        routes.find((r) => r.name.toLowerCase().includes(q)) ||
        routes.find((r) => r.path.toLowerCase() === q) ||
        routes.find((r) => r.path.toLowerCase().includes(q));
      if (match) {
        match.preload?.();
        navigate(match.path);
        setQuery("");
        e.currentTarget.blur();
      }
    },
    [navigate, query, routes]
  );
  return (
    <header className="topbar">
      <div className="left">
        <button
          className="ghost hamburger"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          title="Toggle sidebar"
        >
          <Suspense fallback={<span className="icon" aria-hidden />}> 
            <SidebarIcon deg={sidebar.includes("collapsed") ? "0" : "180"} />
          </Suspense>
        </button>
        <input
          className="top-search"
          placeholder="Search routes... (e.g., Posts)"
          value={query}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
          onFocus={handleSearchFocus}
          list="route-suggestions"
        />
        <datalist id="route-suggestions">
          {routes.map((r) => (
            <option key={r.path} value={r.name} />
          ))}
        </datalist>
      </div>
      <div className="right">
        <button
          className="ghost"
          onClick={toggle}
          aria-label={theme}
          title={theme === "dark" ? "Light" : "Dark"}
        >
          <Suspense fallback={<span className="icon" aria-hidden />}> 
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </Suspense>
        </button>
        <button
          className="danger"
          onClick={handleLogout}
          aria-label="Logout"
          title={`Logout (${user?.name || "User"})`}
        >
          <LogoutIcon color="var(--danger)" />
        </button>
      </div>
    </header>
  );
}
