import styles from "./Textiles.module.css";
import { textiles } from "../../constants/textiles";

function Textiles() {
  return (
    <section className={styles.textiles} id="textiles">
      <span className={styles.badge}>AFRICAN TEXTILES</span>

      <h2>Starting with Ankara.</h2>

      <p>
        AfriWear Care begins with Ankara while laying the foundation for a growing
        digital library of African fabrics.
      </p>

      <div className={styles.grid}>
        {textiles.map((fabric) => (
          <div className={styles.card} key={fabric.id}>
            <h3>{fabric.name}</h3>

            <span
              className={
                fabric.status === "Supported"
                  ? styles.supported
                  : styles.comingSoon
              }
            >
              {fabric.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Textiles;