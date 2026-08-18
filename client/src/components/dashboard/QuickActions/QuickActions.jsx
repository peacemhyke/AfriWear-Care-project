import { QrCode, History, User } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./QuickActions.module.css";

function QuickActions() {
  return (
    <section className={styles.section}>
      <h2>Quick Actions</h2>

      <div className={styles.container}>

        <Link to="/scan" className={styles.card}>
          <QrCode size={34} />
          <h3>Scan Garment</h3>
        </Link>

        <Link to="/history" className={styles.card}>
          <History size={34} />
          <h3>History</h3>
        </Link>

        <Link to="/profile" className={styles.card}>
          <User size={34} />
          <h3>Profile</h3>
        </Link>

      </div>
    </section>
  );
}

export default QuickActions;