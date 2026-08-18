import { Link } from "react-router-dom";
import styles from "./WelcomeCard.module.css";

function WelcomeCard() {
  return (
    <section className={styles.card}>
      <div>
        <p className={styles.small}>Welcome back 👋</p>

        <h1>
          Ready to preserve Africa's stories, one garment at a time?
        </h1>

        <p>
          Scan an Ankara garment and receive personalized care
          guidance from <strong>Fabric Expert.</strong>
        </p>

        <Link to="/scan" className={styles.button}>
          Scan Garment
        </Link>
      </div>
    </section>
  );
}

export default WelcomeCard;