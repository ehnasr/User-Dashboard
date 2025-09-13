import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="app-header">
          <h1>Dashboard</h1>
        </header>
        <main className="main">
          <Routes>
            <Route path="/" element={<div>Welcome to Dashboard</div>} />
            <Route path="/about" element={<div>About Page</div>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
