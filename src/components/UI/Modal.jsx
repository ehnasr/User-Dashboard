import { useEffect } from "react";

export default function Modal({ open, title, children, onClose, footer }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(2,6,23,0.6)",
        backdropFilter: "blur(2px)",
        display: "grid",
        placeItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        className="panel"
        style={{
          width: "min(720px, 92vw)",
          maxHeight: "86vh",
          overflow: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 16,
            borderBottom: "1px solid var(--border)",
          }}
        >
          <strong>{title}</strong>
          <button className="ghost" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div style={{ padding: 16 }}>{children}</div>
        {footer ? (
          <div
            style={{
              padding: 12,
              borderTop: "1px solid var(--border)",
              display: "flex",
              gap: 8,
              justifyContent: "flex-end",
            }}
          >
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
