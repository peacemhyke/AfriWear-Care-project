import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

import HistoryCard from "../../components/history/HistoryCard";
import {
  getScanHistory,
  clearScanHistory,
} from "../../services/historyService";

import styles from "./History.module.css";

function History() {
  const [search, setSearch] = useState("");
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [clearing, setClearing] = useState(false);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const history = await getScanHistory();
        setScans(history);
      } catch (error) {
        console.error("History error:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  const handleDeleted = (deletedId) => {
    setScans((currentScans) =>
      currentScans.filter((scan) => scan.id !== deletedId)
    );
  };

  const handleClearHistory = async () => {
    if (scans.length === 0) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to clear your entire scan history? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    try {
      setClearing(true);

      await clearScanHistory();

      setScans([]);
    } catch (error) {
      console.error("Clear history error:", error.message);

      window.alert(
        error.message || "Failed to clear scan history."
      );
    } finally {
      setClearing(false);
    }
  };

  const filteredScans = scans.filter((garment) => {
    const text = search.toLowerCase();

    return (
      garment.garment_name
        ?.toLowerCase()
        .includes(text) ||
      garment.fabric_name
        ?.toLowerCase()
        .includes(text)
    );
  });

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Scan History</h1>

          <p>Loading your scanned garments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Scan History</h1>

          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Scan History</h1>

          <p>
            View previously scanned garments and reopen
            their care guides anytime.
          </p>
        </div>

        {scans.length > 0 && (
          <button
            type="button"
            onClick={handleClearHistory}
            disabled={clearing}
            className={styles.clearButton}
          >
            <Trash2 size={18} />

            {clearing
              ? "Clearing..."
              : "Clear Scan History"}
          </button>
        )}
      </div>

      <div className={styles.searchSection}>
        <input
          type="text"
          placeholder="Search garments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className={styles.historyGrid}>
        {filteredScans.length > 0 ? (
          filteredScans.map((garment) => (
            <HistoryCard
              key={garment.id}
              garment={garment}
              onDeleted={handleDeleted}
            />
          ))
        ) : (
          <div className={styles.empty}>
            <h2>No garments found</h2>

            <p>
              {search
                ? "Try searching for another garment."
                : "You haven't scanned any garments yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default History;