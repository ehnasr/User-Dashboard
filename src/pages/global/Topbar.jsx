import { useTheme } from "../../context/ThemeContext.jsx";
import "../../App.css";
import SidebarIcon from "../../components/icons/SidebarIcon.jsx";
import MoonIcon from "../../components/icons/MoonIcon.jsx";
import SunIcon from "../../components/icons/SunIcon.jsx";

export default function Topbar({ onToggleSidebar, sidebar }) {
  const { theme, toggle } = useTheme();
  return (
    <header className="topbar">
      <div className="left">
        <button
          className="ghost hamburger"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <SidebarIcon deg={sidebar.includes("collapsed") ? "0" : "180"} />
        </button>
        <input className="top-search" placeholder="Search..." />
      </div>
      <div className="right">
        <a href="https://jsonplaceholder.typicode.com/" target="_blank">
          API Docs
        </a>
        <button className="ghost" onClick={toggle} aria-label={theme}>
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </header>
  );
}
