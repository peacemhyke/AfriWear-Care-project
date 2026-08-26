import { useEffect, useState } from "react";

import { getScanHistory } from "../../../services/historyService";

import styles from "./RecentScans.module.css";

function RecentScans() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecentScans = async () => {
      try {
        const history = await getScanHistory();

        setScans(history.slice(0, 5));
      } catch (error) {
        console.error(
          "Failed to load recent scans:",
          error.message
        );
      } finally {
        setLoading(false);
      }
    };

    loadRecentScans();
  }, []);

  const formatDate = (date) => {
    if (!date) return "Recently scanned";

    return new Date(date).toLocaleString();
  };

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <div>
          <h2>Recent Scans</h2>

          <p>
            Your most recently scanned garments.
          </p>
        </div>
      </div>

      {loading ? (
        <div className={styles.empty}>
          <p>Loading recent scans...</p>
        </div>
      ) : scans.length === 0 ? (
        <div className={styles.empty}>
          <p>
            You haven't scanned any garments yet.
          </p>
        </div>
      ) : (
        <div className={styles.list}>
          {scans.map((scan) => (
            <div
              key={scan.id}
              className={styles.item}
            >
              <div className={styles.details}>
                <h4>
                  {scan.garment_name ||
                    "Unnamed Garment"}
                </h4>

                <p>
                  {scan.fabric_name ||
                    "African Textile"}
                </p>
              </div>

              <span className={styles.date}>
                {formatDate(scan.scanned_at)}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default RecentScans;