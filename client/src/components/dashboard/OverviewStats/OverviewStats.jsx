import { Shirt, Sparkles, Bot } from "lucide-react";
import styles from "./OverviewStats.module.css";

function OverviewStats() {
  return (
    <section className={styles.overview}>
      <h2>Garment Overview</h2>

      <div className={styles.grid}>

        <div className={styles.card}>
          <Shirt size={30} />

          <h3>1</h3>

          <p>Garment Scanned</p>
        </div>

        <div className={styles.card}>
          <Sparkles size={30} />

          <h3>100%</h3>

          <p>Cotton Detected</p>
        </div>

        <div className={styles.card}>
          <Bot size={30} />

          <h3>Ready</h3>

          <p>Fabric Expert AI</p>
        </div>

      </div>
    </section>
  );
}

export default OverviewStats;