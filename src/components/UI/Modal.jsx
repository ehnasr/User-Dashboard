import { useEffect } from "react";
import styles from "./Modal.module.css";

export default function Modal({ open, title, children, onClose, footer }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  if (!open) return null;
  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={`panel ${styles.modal}`}>
        <div className={styles.header}>
          <strong>{title}</strong>
          <button className="ghost" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className={styles.content}>{children}</div>
        {footer ? (
          <div className={styles.footer}>
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
