import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../../services/authService";

import styles from "./WelcomeCard.module.css";

function WelcomeCard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Failed to load user:", error.message);
      }
    };

    loadUser();
  }, []);

  return (
    <section className={styles.card}>
      <div>
        <p className={styles.small}>
          Welcome back{user?.name ? `, ${user.name}` : ""} 👋
        </p>

        <h1>
          Ready to care for your garments the smarter way?
        </h1>

        <p>
          Scan the QR care label on your garment and receive
          personalized guidance from <strong>Fabric Expert.</strong>
        </p>

        <Link to="/scan" className={styles.button}>
          Scan Garment
        </Link>
      </div>
    </section>
  );
}

export default WelcomeCard;