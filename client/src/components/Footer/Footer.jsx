import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <h2>AfriWear Care</h2>

      <p>
        AI-powered garment care designed for African textiles.
      </p>

      <small>
        © 2026 AfriWear Code. All rights reserved.
      </small>
    </footer>
  );
}

export default Footer;