import { usePosts } from "../hooks/usePosts.js";
import NivoLineDemo from "../components/Charts/NivoLineDemo.jsx";
import NivoBarDemo from "../components/Charts/NivoBarDemo.jsx";
import NivoPieDemo from "../components/Charts/NivoPieDemo.jsx";
import NivoGeoDemo from "../components/Charts/NivoGeoDemo.jsx";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const { total, getRecentPosts } = usePosts({
    query: "",
    page: 1,
    pageSize: 10,
  });
  const recentPosts = getRecentPosts(7);
  return (
    <div className="dashboard">
      <div className={styles.sectionHeader}>
        <h2 className="page-title">Dashboard</h2>
        <div className={styles.subtitle}>Welcome to your dashboard</div>
      </div>

      <div className="grid kpi">
        {[
          {
            label: "Posts Created",
            value: total.toLocaleString(),
            delta: "+14%",
          },
          { label: "Sales Obtained", value: "431,225", delta: "+21%" },
          { label: "New Clients", value: "32,441", delta: "+5%" },
          { label: "Traffic Received", value: "1,325,134", delta: "+43%" },
        ].map((kpi) => (
          <div key={kpi.label} className={`panel ${styles.panelPadding}`}>
            <div className={styles.kpiHeader}>
              <div className={styles.kpiLabel}>{kpi.label}</div>
              <span className={`badge ${styles.badgePrimaryOutline}`}>
                {kpi.delta}
              </span>
            </div>
            <div className={styles.kpiValue}>{kpi.value}</div>
          </div>
        ))}
      </div>

      <div className={`grid main-split ${styles.section}`}>
        <div className={`panel ${styles.panelTall}`}>
          <strong>Revenue Generated</strong>
          <div className={styles.revenueValue}>$59,342.32</div>
          <NivoLineDemo />
        </div>
        <div className={`panel ${styles.panelTallScroll}`}>
          <strong>Recent Posts</strong>
          <div className={styles.postsList}>
            {recentPosts.map((post) => (
              <div key={post.id} className={styles.postItem}>
                <div className={styles.postContent}>
                  <div className={styles.postTitle} title={post.title}>
                    {post.title}
                  </div>
                  <div className={styles.postBody} title={post.body}>
                    {post.body}
                  </div>
                </div>
                <div className={`badge ${styles.badgePrimaryOutline}`}>
                  ID: {post.id}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`grid widgets-3 ${styles.section}`}>
        <div className={`panel ${styles.panelMedium}`}>
          <strong>Campaign</strong>
          <NivoPieDemo />
        </div>
        <div className={`panel ${styles.panelMedium}`}>
          <strong>Sales Quantity</strong>
          <NivoBarDemo />
        </div>
        <div className={`panel ${styles.panelMedium}`}>
          <strong>Geography Based Traffic</strong>
          <NivoGeoDemo />
        </div>
      </div>
    </div>
  );
}
