import styles from "./Profile.module.css";

function Profile() {
  return (
    <div className={styles.container}>

      {/* ================= HEADER ================= */}

      <div className={styles.header}>
        <span className={styles.eyebrow}>
          ACCOUNT
        </span>

        <h1>My Profile</h1>

        <p>
          Manage your AfriWear Care account and preferences.
        </p>
      </div>


      {/* ================= PROFILE CARD ================= */}

      <section className={styles.profileCard}>

        <div className={styles.avatar}>
          PE
        </div>

        <div className={styles.profileInfo}>
          <h2>Peace</h2>

          <p>
            Computer Engineering Student
          </p>

          <span>
            AfriWear Care User
          </span>
        </div>

      </section>


      {/* ================= ACCOUNT INFORMATION ================= */}

      <section className={styles.section}>

        <div className={styles.sectionHeader}>
          <h2>Account Information</h2>

          <p>
            Your basic account details.
          </p>
        </div>

        <div className={styles.infoGrid}>

          <div className={styles.infoCard}>
            <span>Name</span>
            <strong>Peace</strong>
          </div>

          <div className={styles.infoCard}>
            <span>Email</span>
            <strong>peace@example.com</strong>
          </div>

          <div className={styles.infoCard}>
            <span>Account Type</span>
            <strong>Personal</strong>
          </div>

          <div className={styles.infoCard}>
            <span>Member Since</span>
            <strong>August 2026</strong>
          </div>

        </div>

      </section>


      {/* ================= ACTIVITY ================= */}

      <section className={styles.section}>

        <div className={styles.sectionHeader}>
          <h2>Your Activity</h2>

          <p>
            A quick look at your garment care activity.
          </p>
        </div>

        <div className={styles.stats}>

          <div className={styles.statCard}>
            <strong>3</strong>
            <span>Garments Scanned</span>
          </div>

          <div className={styles.statCard}>
            <strong>3</strong>
            <span>Care Guides</span>
          </div>

          <div className={styles.statCard}>
            <strong>1</strong>
            <span>Textile Type</span>
          </div>

        </div>

      </section>


      {/* ================= PREFERENCES ================= */}

      <section className={styles.section}>

        <div className={styles.sectionHeader}>
          <h2>Preferences</h2>

          <p>
            Choose how AfriWear Care keeps you informed.
          </p>
        </div>

        <div className={styles.preferenceCard}>

          <div>
            <strong>Care reminders</strong>

            <p>
              Receive reminders about caring for your garments.
            </p>
          </div>

          <label className={styles.toggle}>
            <input
              type="checkbox"
              defaultChecked
            />

            <span></span>
          </label>

        </div>

      </section>

    </div>
  );
}

export default Profile;