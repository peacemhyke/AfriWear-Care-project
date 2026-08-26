import { useState } from "react";
import { Link } from "react-router-dom";
import {
Clock3,
ArrowRight,
Trash2,
} from "lucide-react";

import { deleteScanHistory } from "../../services/historyService";

import styles from "./HistoryCard.module.css";

function HistoryCard({ garment, onDeleted }) {
const [deleting, setDeleting] = useState(false);

const formattedDate = garment.scanned_at
? new Date(garment.scanned_at).toLocaleString()
: "Recently scanned";

const handleDelete = async () => {
const confirmed = window.confirm(
`Delete "${garment.garment_name || "this garment"}" from your scan history?`
);

if (!confirmed) return;

try {
  setDeleting(true);

  await deleteScanHistory(garment.id);

  onDeleted(garment.id);
} catch (error) {
  console.error("Delete history error:", error.message);

  window.alert(
    error.message || "Failed to delete scan history."
  );
} finally {
  setDeleting(false);
}

};

return ( <article className={styles.card}> <div className={styles.content}>

    <span className={styles.fabric}>
      {garment.fabric_name || "African Textile"}
    </span>

    <h2>
      {garment.garment_name || "Unnamed Garment"}
    </h2>

    <div className={styles.date}>
      <Clock3 size={16} />
      <span>{formattedDate}</span>
    </div>

    <div className={styles.actions}>

      <Link
        to={`/garment/${garment.code}`}
        className={styles.button}
      >
        View Care Guide
        <ArrowRight size={18} />
      </Link>

      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        className={styles.deleteButton}
        aria-label="Delete scan from history"
      >
        <Trash2 size={17} />

        {deleting ? "Deleting..." : "Delete"}
      </button>

    </div>

  </div>
</article>

);
}

export default HistoryCard;
