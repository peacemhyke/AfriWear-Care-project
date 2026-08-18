import styles from "./TextileSpotlight.module.css";

function TextileSpotlight() {
  return (
    <section className={styles.card}>
      <span className={styles.badge}>TEXTILE SPOTLIGHT</span>

      <h2>Ankara</h2>

      <p>
        Ankara is a vibrant 100% cotton fabric known for its bold
        prints. Proper washing and drying help preserve its colour
        and texture for years.
      </p>

      <button>Learn More</button>
    </section>
  );
}

export default TextileSpotlight;