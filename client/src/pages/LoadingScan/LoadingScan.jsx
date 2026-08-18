import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ScanLine,
  CheckCircle2,
} from "lucide-react";

import styles from "./LoadingScan.module.css";

function LoadingScan() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const qr = searchParams.get("qr");

  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [];

    timers.push(
      setTimeout(() => setStep(1), 700)
    );

    timers.push(
      setTimeout(() => setStep(2), 1400)
    );

    timers.push(
      setTimeout(() => {
        navigate(`/garment/${qr}`);
      }, 2300)
    );

    return () => timers.forEach(clearTimeout);
  }, [navigate, qr]);

  return (
    <main className={styles.container}>
      <section className={styles.card}>

        {/* =======================
            BRAND MARK
        ======================= */}

        <div className={styles.icon}>
          <ScanLine size={28} />
        </div>

        {/* =======================
            HEADER
        ======================= */}

        <span className={styles.eyebrow}>
          AFRIWEAR CARE
        </span>

        <h1>
          Analyzing your garment...
        </h1>

        <p className={styles.description}>
          We're identifying your fabric and preparing
          personalized care guidance.
        </p>

        {/* =======================
            SCANNER
        ======================= */}

        <div className={styles.scanner}>
          <div className={styles.scanGlow}></div>

          <div className={styles.scanLine}></div>

          <div className={styles.scannerIcon}>
            <ScanLine size={42} />
          </div>
        </div>

        {/* =======================
            STEPS
        ======================= */}

        <div className={styles.steps}>

          <div
            className={`${styles.step} ${
              step >= 0 ? styles.completed : ""
            }`}
          >
            <CheckCircle2 size={20} />

            <span>
              QR label detected
            </span>
          </div>

          <div
            className={`${styles.step} ${
              step >= 1 ? styles.completed : ""
            }`}
          >
            <CheckCircle2 size={20} />

            <span>
              Identifying fabric
            </span>
          </div>

          <div
            className={`${styles.step} ${
              step >= 2 ? styles.completed : ""
            }`}
          >
            <CheckCircle2 size={20} />

            <span>
              Preparing care guide
            </span>
          </div>

        </div>

        <div className={styles.footerText}>
          This should only take a moment.
        </div>

      </section>
    </main>
  );
}

export default LoadingScan;