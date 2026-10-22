
import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import styles from "./DashboardLayout.module.css";

function DashboardLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const userRole = localStorage.getItem("userRole");
  const isDesigner = userRole === "DESIGNER";

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setMenuOpen(false);
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    isActive ? styles.active : "";

  return (
    <div className={styles.dashboard}>
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
          {isDesigner ? (
            <>
              <NavLink
                to="/designer-dashboard"
                onClick={closeMenu}
                className={navLinkClass}
              >
                🧵 Designer Dashboard
              </NavLink>

              <NavLink
                to="/designer-dashboard"
                onClick={closeMenu}
                className={navLinkClass}
              >
                👗 My Garments
              </NavLink>

              <NavLink
                to="/designer-dashboard"
                onClick={closeMenu}
                className={navLinkClass}
              >
                👤 Designer Profile
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/dashboard"
                onClick={closeMenu}
                className={navLinkClass}
              >
                🏠 Dashboard
              </NavLink>

              <NavLink
                to="/scan"
                onClick={closeMenu}
                className={navLinkClass}
              >
                📷 Scan
              </NavLink>

              <NavLink
                to="/history"
                onClick={closeMenu}
                className={navLinkClass}
              >
                📜 History
              </NavLink>

              <NavLink
                to="/profile"
                onClick={closeMenu}
                className={navLinkClass}
              >
                👤 Profile
              </NavLink>
            </>
          )}

          <button
            className={styles.logoutButton}
            onClick={handleLogout}
          >
            🚪 Logout
          </button>
        </nav>
      </aside>

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;