import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";
import { APP } from "../../config/app";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>

      <Link to="/" className={styles.logo}>
        {APP.name}
      </Link>

      <button
        className={styles.menuButton}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <ul
        className={`${styles.links} ${
          menuOpen ? styles.open : ""
        }`}
      >
        <li>
          <a
            href="#features"
            onClick={() => setMenuOpen(false)}
          >
            Features
          </a>
        </li>

        <li>
          <a
            href="#how-it-works"
            onClick={() => setMenuOpen(false)}
          >
            How It Works
          </a>
        </li>

        <li>
          <a
            href="#textiles"
            onClick={() => setMenuOpen(false)}
          >
            African Textiles
          </a>
        </li>

        <li>
          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
        </li>

        <li className={styles.mobileScan}>
          <Link
            to="/scan"
            onClick={() => setMenuOpen(false)}
          >
            Scan Your Garment
          </Link>
        </li>
      </ul>

      <Link
        to="/scan"
        className={styles.scanButton}
      >
        Scan Your Garment
      </Link>

    </nav>
  );
}

export default Navbar;