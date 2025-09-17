import { NavLink } from "react-router-dom";
import Time from "../../components/utilities/Time.jsx";
import { lazy, Suspense } from "react";
const ArrowRightIcon = lazy(() => import("../../components/icons/ArrowRightIcon.jsx"));
const ClockIcon = lazy(() => import("../../components/icons/ClockIcon.jsx"));
const HomeIcon = lazy(() => import("../../components/icons/HomeIcon.jsx"));
const NoteIcon = lazy(() => import("../../components/icons/NoteIcon.jsx"));
const InfoIcon = lazy(() => import("../../components/icons/InfoIcon.jsx"));
import "../../App.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="profile-card">
        <div className="avatar" aria-hidden>
          <img src="https://i.pravatar.cc/100?img=12" alt="user avatar" loading="lazy" />
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
          <Suspense fallback={<span className="icon" aria-hidden />}> 
            <HomeIcon className="home-icon icon" />
          </Suspense>
          <span>Dashboard</span>
          <Suspense fallback={<span className="icon" aria-hidden />}>
            <ArrowRightIcon className="arrow-right-icon icon" />
          </Suspense>
        </NavLink>
        <NavLink
          to="/posts"
          className={({ isActive }) => (isActive ? "active" : "")}
          data-tip="Posts"
          title="Posts"
          aria-label="Posts"
        >
          <Suspense fallback={<span className="icon" aria-hidden />}> 
            <NoteIcon className="note-icon icon" />
          </Suspense>
          <span>Posts</span>
          <Suspense fallback={<span className="icon" aria-hidden />}> 
            <ArrowRightIcon className="arrow-right-icon icon" />
          </Suspense>
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active" : "")}
          data-tip="About"
          title="About"
          aria-label="About"
        >
          <Suspense fallback={<span className="icon" aria-hidden />}> 
            <InfoIcon className="info-icon icon" />
          </Suspense>
          <span>About</span>
          <Suspense fallback={<span className="icon" aria-hidden />}> 
            <ArrowRightIcon className="arrow-right-icon icon" />
          </Suspense>
        </NavLink>
      </nav>
      <div className="sidebar-footer">
        <Suspense fallback={<span className="icon" aria-hidden />}> 
          <ClockIcon className="clock-icon icon" color={"var(--panel)"} />
        </Suspense>
        <Time />
      </div>
    </aside>
  );
}
