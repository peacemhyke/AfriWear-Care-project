import { useState } from "react";

import { recentScans } from "../../data/recentScans";
import HistoryCard from "../../components/history/HistoryCard";

import styles from "./History.module.css";

function History() {
  const [search, setSearch] = useState("");

  const filteredScans = recentScans.filter((garment) => {
    const text = search.toLowerCase();

    return (
      garment.garment.toLowerCase().includes(text) ||
      garment.fabric.toLowerCase().includes(text)
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Scan History</h1>

        <p>
          View previously scanned garments and reopen
          their care guides anytime.
        </p>
      </div>

      <div className={styles.searchSection}>
        <input
          type="text"
          placeholder="Search garments..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      <div className={styles.historyGrid}>
        {filteredScans.length > 0 ? (
          filteredScans.map((garment) => (
            <HistoryCard
              key={garment.id}
              garment={garment}
            />
          ))
        ) : (
          <div className={styles.empty}>
            <h2>No garments found</h2>

            <p>
              Try searching for another garment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default History;