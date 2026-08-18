import styles from "./HowItWorks.module.css";
import { howItWorks } from "../../constants/howItWorks";

function HowItWorks() {
  return (
    <section className={styles.section} id="how-it-works">
      <span className={styles.badge}>HOW IT WORKS</span>

      <h2>Three simple steps.</h2>

      <div className={styles.grid}>
        {howItWorks.map((step) => (
          <div key={step.id} className={styles.card}>
            <div className={styles.number}>{step.step}</div>

            <h3>{step.title}</h3>

            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;