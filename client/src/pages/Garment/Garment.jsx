import { useParams } from "react-router-dom";
import {
  Droplets,
  Sun,
  Flame,
  Archive,
} from "lucide-react";

import { recentScans } from "../../data/recentScans";
import FabricExpert from "../../components/ai/FabricExpert";
import FabricWisdom from "../../components/FabricWisdom/FabricWisdom";

import styles from "./Garment.module.css";

function Garment() {
  const { id } = useParams();

  const garment = recentScans.find(
    (item) => item.qrCode === id
  );

  if (!garment) {
    return (
      <div className={styles.container}>
        <h2>Garment not found.</h2>
      </div>
    );
  }

  return (
    <div className={styles.container}>

      {/* ================= IMAGE ================= */}

      <img
        src={garment.image}
        alt={garment.garment}
        className={styles.image}
      />

      {/* ================= TITLE ================= */}

      <span className={styles.badge}>
        {garment.fabric}
      </span>

      <h1>{garment.garment}</h1>

      <p className={styles.qr}>
        QR Code: {garment.qrCode}
      </p>

      {/* ================= CARE GUIDE ================= */}

      <section className={styles.careSection}>

        <div className={styles.careCard}>
          <Droplets size={30} />

          <h3>Wash</h3>

          <p>{garment.careGuide.wash}</p>

          <small>
            {garment.careGuide.detergent}
          </small>

        </div>

        <div className={styles.careCard}>
          <Sun size={30} />

          <h3>Dry</h3>

          <p>{garment.careGuide.dry}</p>

          <small>
            {garment.careGuide.wring}
          </small>

        </div>

        <div className={styles.careCard}>
          <Flame size={30} />

          <h3>Iron</h3>

          <p>{garment.careGuide.iron}</p>

          <small>
            {garment.careGuide.bleach}
          </small>

        </div>

        <div className={styles.careCard}>
          <Archive size={30} />

          <h3>Storage</h3>

          <p>{garment.careGuide.storage}</p>

          <small>
            {garment.careGuide.separateColours}
          </small>

        </div>

      </section>

      {/* ================= FABRIC EXPERT ================= */}

      <FabricExpert garment={garment} />

      {/* ================= FABRIC WISDOM ================= */}
      
      <FabricWisdom garment={garment} />

    </div>
  );
}

export default Garment;