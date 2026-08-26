import styles from "./TextileSpotlight.module.css";

function TextileSpotlight() {
  return (
    <section className={styles.card}>
      <span className={styles.badge}>TEXTILE SPOTLIGHT</span>

      <h2>Ankara</h2>

      <p>
        Ankara is a vibrant African textile commonly made from
        cotton and known for its bold colours and distinctive
        patterns. Proper washing, drying, ironing, and storage
        help preserve its colour, texture, and shape.
      </p>

      <div className={styles.tip}>
        <strong>Care Tip</strong>
        <span>
          Follow the recommended care instructions for your
          specific Ankara garment.
        </span>
      </div>
    </section>
  );
}

export default TextileSpotlight;