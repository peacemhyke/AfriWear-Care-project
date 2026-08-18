import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

import styles from "./DashboardLayout.module.css";

function DashboardLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <div className={styles.dashboard}>

      {/* ==========================
          SIDEBAR / MOBILE HEADER
      ========================== */}

      <aside className={styles.sidebar}>

        <div className={styles.sidebarHeader}>
          <h2>AfriWear Care</h2>

          <button
            className={styles.menuButton}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        <nav className={menuOpen ? styles.navOpen : ""}>

          <NavLink
            to="/dashboard"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? styles.active : ""
            }
          >
            🏠 Dashboard
          </NavLink>

          <NavLink
            to="/scan"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? styles.active : ""
            }
          >
            📷 Scan
          </NavLink>

          <NavLink
            to="/history"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? styles.active : ""
            }
          >
            📜 History
          </NavLink>

          <NavLink
            to="/profile"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? styles.active : ""
            }
          >
            👤 Profile
          </NavLink>

          <button
            className={styles.logoutButton}
            onClick={handleLogout}
          >
            🚪 Logout
          </button>

        </nav>

      </aside>

      {/* ==========================
          PAGE CONTENT
      ========================== */}

      <main className={styles.content}>
        <Outlet />
      </main>

    </div>
  );
}

export default DashboardLayout;