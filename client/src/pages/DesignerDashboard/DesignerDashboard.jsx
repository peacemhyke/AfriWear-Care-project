import styles from "./DesignerDashboard.module.css";

function DesignerDashboard() {
  return (
    <main className={styles.container}>
      {/* Header */}
      <section className={styles.header}>
        <div>
          <p className={styles.eyebrow}>DESIGNER SPACE</p>

          <h1>Welcome, Designer</h1>

          <p>
            Share your garments, provide care information, and help people
            care for their African textiles.
          </p>
        </div>

        <button className={styles.primaryButton}>
          + Add New Garment
        </button>
      </section>

      {/* Statistics */}
      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span>Total Garments</span>
          <strong>0</strong>
        </div>

        <div className={styles.statCard}>
          <span>Approved</span>
          <strong>0</strong>
        </div>

        <div className={styles.statCard}>
          <span>Pending Review</span>
          <strong>0</strong>
        </div>
      </section>

      {/* Profile Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>Designer Profile</h2>
            <p>
              Your brand information will appear on the garment care page.
            </p>
          </div>

          <button className={styles.secondaryButton}>
            Edit Profile
          </button>
        </div>

        <div className={styles.profileCard}>
          <div className={styles.logoPlaceholder}>
            D
          </div>

          <div>
            <h3>Your Brand Name</h3>
            <p>Designer profile coming soon</p>
          </div>
        </div>
      </section>

      {/* Garments Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>My Garments</h2>
            <p>Manage your submitted garments and their approval status.</p>
          </div>
        </div>

        <div className={styles.emptyState}>
          <h3>No garments yet</h3>

          <p>
            Add your first garment to provide customers with digital care
            instructions.
          </p>

          <button className={styles.primaryButton}>
            Add Your First Garment
          </button>
        </div>
      </section>

      {/* Future Feature */}
      <section className={styles.futureCard}>
        <span>COMING SOON</span>

        <h2>Style Your Outfit</h2>

        <p>
          In the future, designers will be able to add styling guides,
          videos, and links to help customers explore different ways to
          wear their garments.
        </p>
      </section>
    </main>
  );
}

export default DesignerDashboard;