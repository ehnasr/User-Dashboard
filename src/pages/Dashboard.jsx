import { usePosts } from "../hooks/usePosts.js";
import NivoLine from "../components/Charts/NivoLine.jsx";
import NivoBar from "../components/Charts/NivoBar.jsx";
import NivoPie from "../components/Charts/NivoPie.jsx";
import NivoGeo from "../components/Charts/NivoGeo.jsx";
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
          { label: "Sales Obtained", value: "4,225", delta: "+21%" },
          { label: "New Clients", value: "441", delta: "+5%" },
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
          <div className={styles.revenueValue}>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(10000 + Math.random() * 40000)}
          </div>
          <NivoLine />
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
          <NivoPie />
        </div>
        <div className={`panel ${styles.panelMedium}`}>
          <strong>Sales Quantity</strong>
          <NivoBar />
        </div>
        <div className={`panel ${styles.panelMedium}`}>
          <strong>Geography Based Traffic</strong>
          <NivoGeo />
        </div>
      </div>
    </div>
  );
}
