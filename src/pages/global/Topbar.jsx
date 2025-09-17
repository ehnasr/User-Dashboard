import { useTheme } from "../../context/ThemeContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNotification } from "../../context/NotificationContext.jsx";
import SidebarIcon from "../../components/icons/SidebarIcon.jsx";
import MoonIcon from "../../components/icons/MoonIcon.jsx";
import SunIcon from "../../components/icons/SunIcon.jsx";
import "../../App.css";
import LogoutIcon from "../../components/icons/LogoutIcon.jsx";

export default function Topbar({ onToggleSidebar, sidebar }) {
  const { theme, toggle } = useTheme();
  const { logout, user } = useAuth();
  const { success } = useNotification();

  const handleLogout = () => {
    logout();
    success("Logged out successfully");
  };
  return (
    <header className="topbar">
      <div className="left">
        <button
          className="ghost hamburger"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          title="Toggle sidebar"
        >
          <SidebarIcon deg={sidebar.includes("collapsed") ? "0" : "180"} />
        </button>
        <input className="top-search" placeholder="Search..." />
      </div>
      <div className="right">
        <button
          className="ghost"
          onClick={toggle}
          aria-label={theme}
          title={theme === "dark" ? "Light" : "Dark"}
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
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
