import { useNotification } from "../../context/NotificationContext.jsx";
import styles from "./NotificationContainer.module.css";

export default function NotificationContainer() {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className={styles.container}>
      {notifications?.map((notification) => (
        <div
          key={notification.id}
          className={`${styles.notification} ${styles[notification.type]} ${
            notification.slideOut ? styles["slide-out"] : ""
          }`}
          style={{
            "--countdown-duration": `${notification.duration}ms`,
          }}
        >
          <div style={{ flex: 1 }}>{notification.message}</div>
          <button
            onClick={() => removeNotification(notification.id)}
            style={{
              background: "none",
              border: "none",
              fontSize: "18px",
              cursor: "pointer",
              color: "var(--text-light)",
              padding: "4px",
            }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
