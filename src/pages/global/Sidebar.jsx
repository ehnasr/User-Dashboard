import { NavLink } from "react-router-dom";
import Time from "../../components/utilities/Time.jsx";
import ArrowRightIcon from "../../components/icons/ArrowRightIcon.jsx";
import ClockIcon from "../../components/icons/ClockIcon.jsx";
import HomeIcon from "../../components/icons/HomeIcon.jsx";
import NoteIcon from "../../components/icons/NoteIcon.jsx";
import InfoIcon from "../../components/icons/InfoIcon.jsx";
import "../../App.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="profile-card">
        <div className="avatar" aria-hidden>
          <img src="https://i.pravatar.cc/100?img=12" alt="user avatar" />
        </div>
        <div className="profile-meta">
          <div className="profile-name">Ehab Nasr</div>
          <div className="profile-role">VIP User</div>
        </div>
      </div>

      <nav className="nav">
        <div className="section-label">Data</div>
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "active" : "")}
          data-tip="Dashboard"
          title="Dashboard"
          aria-label="Dashboard"
        >
          <HomeIcon className="home-icon icon" />
          <span>Dashboard</span>
          <ArrowRightIcon className="arrow-right-icon icon" />
        </NavLink>
        <NavLink
          to="/posts"
          className={({ isActive }) => (isActive ? "active" : "")}
          data-tip="Posts"
          title="Posts"
          aria-label="Posts"
        >
          <NoteIcon className="note-icon icon" />
          <span>Posts</span>
          <ArrowRightIcon className="arrow-right-icon icon" />
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active" : "")}
          data-tip="About"
          title="About"
          aria-label="About"
        >
          <InfoIcon className="info-icon icon" />
          <span>About</span>
          <ArrowRightIcon className="arrow-right-icon icon" />
        </NavLink>
      </nav>
      <div className="sidebar-footer">
        <ClockIcon className="clock-icon icon" color={"var(--panel)"} />
        <Time />
      </div>
    </aside>
  );
}
