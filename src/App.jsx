import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import Sidebar from "./pages/global/Sidebar.jsx";
import Topbar from "./pages/global/Topbar.jsx";
import "./App.css";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
        <div style={{ padding: '2rem', color: 'var(--text)' }}>
          <h1>Welcome to your Dashboard</h1>
          <p>This is the main content area. Add your dashboard content here.</p>
        </div>
      </main>
    </div>
  );
}
