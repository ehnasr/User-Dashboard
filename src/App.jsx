import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, useTheme } from "./context/ThemeContext.jsx";
import "./App.css";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="app">
          <header className="app-header">
            <h1>Dashboard</h1>
          </header>
          <ToggleTheme />
          <main className="main">
            <Routes>
              <Route path="/" element={<div>Welcome to Dashboard</div>} />
              <Route path="/about" element={<div>About Page</div>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

function ToggleTheme() {
  const { theme, toggle } = useTheme();
  return (
    <button className="ghost" onClick={toggle}>
      <span style={{ fontSize: "12px" }}>
        {theme === "dark" ? "Light" : "Dark"}
      </span>
    </button>
  );
}
