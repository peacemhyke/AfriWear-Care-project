import { useEffect, useState } from "react";
import styles from "./Hero.module.css";
import { Link } from "react-router-dom";

import { recentScans } from "../../data/recentScans";
import { heroContent } from "../../constants/heroContent";

function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % recentScans.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const garment = recentScans[current];

  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <span className={styles.badge}>
          {heroContent.badge}
        </span>

        <h1>
          {heroContent.title.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </h1>

        <p>{heroContent.description}</p>

        <small className={styles.note}>
          {heroContent.note}
        </small>

        <div className={styles.buttons}>
          <Link
  to="/scan"
  className={styles.primary}
>
  {heroContent.primaryButton}
</Link>

<Link
  to="/garment/ANK001"
  className={styles.secondary}
>
  {heroContent.secondaryButton}
</Link>
        </div>

        <div className={styles.features}>
          <span>✓ AI Fabric Intelligence</span>
          <span>✓ QR Digital Care Labels</span>
          <span>✓ Built for African Textiles</span>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.phone}>
          <div className={styles.qrContainer}>
            <div className={styles.qr}></div>

            <span>Analyzing Garment...</span>
          </div>

          <div className={styles.phoneHeader}>
            {garment.garment}
          </div>

          <div className={styles.fabric}>
            {garment.fabric}
          </div>

          <div className={styles.card}>
            <h3>Recommended Care</h3>

            <ul>
              <li>✓ {garment.careGuide.wash}</li>
              <li>✓ {garment.careGuide.detergent}</li>
              <li>✓ {garment.careGuide.dry}</li>
              <li>✓ {garment.careGuide.iron}</li>
            </ul>
          </div>

          <div className={styles.chatBubble}>
            <strong>Fabric Expert</strong>

            <p>{garment.careGuide.aiResponse}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;