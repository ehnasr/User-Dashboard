import HeartShineIcon from "../components/icons/HeartShineIcon.jsx";
import StarShineIcon from "../components/icons/StarShineIcon.jsx";
import MagicStickIcon from "../components/icons/MagicStickIcon.jsx";
import styles from "./About.module.css";

export default function PageAbout() {
  return (
    <div className={`panel ${styles.panelPadding}`}>
      <h2 className={`page-title ${styles.titleMargin}`}>
        About User Dashboard
      </h2>
      <div className={styles.gridGap}>
        <div className={styles.rowFlex}>
          <HeartShineIcon
            className="heart-icon about-icon"
            color={"var(--text)"}
          />
          <h3 className={styles.h3Title}>Purpose</h3>
        </div>
        <p className={styles.paragraph}>
          This is a lightweight, modern dashboard demo showcasing React best
          practices, responsive design, and clean vanilla CSS styling. Built as
          a foundation for larger platform modules.
        </p>
        <div className={styles.rowFlex}>
          <MagicStickIcon
            className="heart-icon about-icon"
            color={"var(--text)"}
          />
          <h3 className={styles.h3Title}>Tech Stack</h3>
        </div>
        <div className={styles.techGrid}>
          <div className={styles.card}>
            <strong>React 19</strong> - Modern UI library
          </div>
          <div className={styles.card}>
            <strong>Vite</strong> - Fast build tool
          </div>
          <div className={styles.card}>
            <strong>Vanilla CSS</strong> - Custom styling
          </div>
          <div className={styles.card}>
            <strong>JSONPlaceholder</strong> - Mock API
          </div>
          <div className={styles.card}>
            <strong>Nivo</strong> - Data visualization library
          </div>
        </div>
        <div className={styles.rowFlex}>
          <StarShineIcon
            className="heart-icon about-icon"
            color={"var(--text)"}
          />
          <h3 className={styles.h3Title}>Features</h3>
        </div>
        <ul className={styles.list}>
          <li>Responsive layout with sidebar navigation</li>
          <li>Light/Dark theme switching</li>
          <li>Real-time data fetching and management</li>
          <li>Optimistic UI updates</li>
          <li>Modern animations and transitions</li>
          <li>Mock authentication system</li>
        </ul>
      </div>
    </div>
  );
}
