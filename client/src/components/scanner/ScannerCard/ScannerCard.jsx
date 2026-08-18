import { Link } from "react-router-dom";
import { ScanLine, ShieldCheck } from "lucide-react";

import styles from "./ScannerCard.module.css";
import { recentScans } from "../../../data/recentScans";

function ScannerCard() {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>GARMENT SCANNER</span>

        <h1>Scan Your Garment</h1>

        <p>
          Scan the QR care label on your garment to get
          personalized care guidance.
        </p>
      </div>

      <div className={styles.step}>
        <span className={styles.stepNumber}>1</span>

        <div>
          <strong>Position your care label</strong>
          <p>
            Place the QR code inside the scanning frame.
          </p>
        </div>
      </div>

      <div className={styles.scanner}>
        <div className={styles.cornerTopLeft}></div>
        <div className={styles.cornerTopRight}></div>
        <div className={styles.cornerBottomLeft}></div>
        <div className={styles.cornerBottomRight}></div>

        <div className={styles.scanLine}></div>

        <div className={styles.scannerCenter}>
          <ScanLine size={34} />
          <span>Scanning for care label...</span>
        </div>
      </div>

      <div className={styles.demo}>
        <ShieldCheck size={18} />

        <span>
          Don't have a QR label yet? Try our demo garment.
        </span>
      </div>

      <Link
        to={`/loading?qr=${recentScans[0].qrCode}`}
        className={styles.button}
      >
        <ScanLine size={20} />
        Try Demo Ankara Label
      </Link>
    </section>
  );
}

export default ScannerCard;