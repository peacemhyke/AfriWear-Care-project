import { useNavigate } from "react-router-dom";

import styles from "./DemoQR.module.css";
import { recentScans } from "../../data/recentScans";

function DemoQR() {
  const navigate = useNavigate();

  return (
    <section className={styles.demoSection}>
      <h2>Try a Demo Ankara Label</h2>

      <p>
        Experience AfriWear Care by scanning one of our
        sample Ankara garment labels.
      </p>

      <div className={styles.grid}>
        {recentScans.map((garment) => (
          <div
            key={garment.id}
            className={styles.card}
          >
            <div className={styles.qr}></div>

            <h3>{garment.garment}</h3>

            <span>{garment.fabric}</span>

            <small>{garment.qrCode}</small>

            <button
              onClick={() =>
                navigate(
                  `/garment/${garment.qrCode}`
                )
              }
            >
              Scan Demo
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DemoQR;