import { Link } from "react-router-dom";
import { Clock3, ArrowRight } from "lucide-react";

import styles from "./HistoryCard.module.css";

function HistoryCard({ garment }) {
  return (
    <article className={styles.card}>
      <div className={styles.content}>
        <span className={styles.fabric}>
          {garment.fabric}
        </span>

        <h2>{garment.garment}</h2>

        <div className={styles.date}>
          <Clock3 size={16} />
          <span>{garment.scanDate}</span>
        </div>

        <Link
          to={`/garment/${garment.qrCode}`}
          className={styles.button}
        >
          View Care Guide
          <ArrowRight size={18} />
        </Link>
      </div>
    </article>
  );
}

export default HistoryCard;