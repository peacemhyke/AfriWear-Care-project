import { useEffect, useState } from "react";
import { Shirt, Sparkles, Bot } from "lucide-react";

import { getScanHistory } from "../../../services/historyService";

import styles from "./OverviewStats.module.css";

function OverviewStats() {
  const [scanCount, setScanCount] = useState(0);
  const [topFabric, setTopFabric] = useState("No fabric yet");

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const history = await getScanHistory();
        setScanCount(history.length);
        if (history.length > 0) { 
          const fabricCounts = {};
        history.forEach((scan) => { 
          const fabric = 
          scan.fabric_name || "African Textile";
        fabricCounts[fabric] = 
        (fabricCounts[fabric] || 0) + 1; 
      });  

      const mostScannedFabric = Object.keys( 
        fabricCounts 
      ).reduce((a, b) => 
        fabricCounts[a] > fabricCounts[b] 
        ? a 
        : b 
      );
      setTopFabric(mostScannedFabric); 
    }

      } catch (error) {
        console.error("Failed to load scan history:", error.message);
      }
    };

    loadHistory();
  }, []);

    return (
    <section className={styles.overview}>
      <h2>Garment Overview</h2>

      <div className={styles.grid}>
        <div className={styles.card}>
          <Shirt size={30} />

          <h3>{scanCount}</h3>

          <p>
            {scanCount === 1
              ? "Garment Scanned"
              : "Garments Scanned"}
          </p>
        </div>

        <div className={styles.card}>
          <Sparkles size={30} />

          <h3 className={styles.fabricName}>
            {topFabric}
          </h3>

          <p>Most Scanned Fabric</p>
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