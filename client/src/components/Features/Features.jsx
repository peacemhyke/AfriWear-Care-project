import styles from "./Features.module.css";
import { features } from "../../constants/features";

function Features() {
  return (
    <section className={styles.features} id="features">

      <span className={styles.badge}>
        WHY AFRIWEAR CARE?
      </span>

      <h2>
        Everything you need to care for your garments.
      </h2>

      <p>
        AfriWear Care combines QR technology, conversational AI and
        textile knowledge to help users confidently preserve
        their clothing.
      </p>

      <div className={styles.grid}>

        {features.map((feature) => (

          <div className={styles.card} key={feature.id}>

            <div className={styles.icon}>
              {feature.icon}
            </div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Features;