import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";
import { APP } from "../../config/app";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>

      <Link
        to="/"
        className={styles.logo}
        onClick={closeMenu}
      >
        {APP.name}
      </Link>

      <button
        className={styles.menuButton}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* mobile menu */}
      <ul
        className={
          menuOpen
            ? styles.links + " " + styles.open
            : styles.links
        }
      >
        <li>
          <a href="#features" onClick={closeMenu}>
            Features
          </a>
        </li>

        <li>
          <a href="#how-it-works" onClick={closeMenu}>
            How It Works
          </a>
        </li>

        <li>
          <a href="#textiles" onClick={closeMenu}>
            African Textiles
          </a>
        </li>

        <li>
          <Link to="/about" onClick={closeMenu}>
            About
          </Link>
        </li>

        {
          !token ?
            <li className={styles.mobileLogin}>
              <Link to="/login" onClick={closeMenu}>
                Log In
              </Link>
            </li> :
            <li className={styles.mobileScan}>
              <Link to="/dashboard" onClick={closeMenu}>
                Dashboard
              </Link>
            </li>
        }
        <li className={styles.mobileScan}>
          <Link to="/scan" onClick={closeMenu}>
            Scan Your Garment
          </Link>
        </li>
      </ul>

      {/* desktop */}
      <div className={styles.actions}>

        {
          !token ?
            <Link
              to="/login"
              className={styles.loginButton}
            >
              Log In
            </Link> :
            <Link
              to="/dashboard"
              className={styles.scanButton}
            >
              Dashboard
            </Link>
        }

        <Link
          to="/scan"
          className={styles.scanButton}
        >
          Scan Your Garment
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;
