import styles from "./RecentScans.module.css";
import { recentScans } from "../../../data/recentScans";

function RecentScans() {
  return (
    <section className={styles.card}>
      <h2>Recent Scans</h2>

      {recentScans.map((scan) => (
        <div key={scan.id} className={styles.item}>
          <div>
            <h4>{scan.garment}</h4>
            <p>{scan.fabric}</p>
          </div>

          <span>{scan.date}</span>
        </div>
      ))}
    </section>
  );
}

export default RecentScans;