import { useEffect, useState } from "react";

import { getCurrentUser } from "../../services/authService";
import { getScanHistory } from "../../services/historyService";

import styles from "./Profile.module.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [scanCount, setScanCount] = useState(0);
  const [garmentCount, setGarmentCount] = useState(0);
  const [textileCount, setTextileCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const [currentUser, history] =
          await Promise.all([
            getCurrentUser(),
            getScanHistory(),
          ]);

        setUser(currentUser);
        setScanCount(history.length);
        const uniqueGarments = new Set(
  history
    .map((item) => item.garment_id)
    .filter(Boolean)
);

setGarmentCount(uniqueGarments.size);

        const uniqueFabrics = new Set(
          history
            .map((item) => item.fabric_name)
            .filter(Boolean)
        );

        setTextileCount(uniqueFabrics.size);
      } catch (error) {
        console.error(
          "Profile error:",
          error.message
        );

        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>My Profile</h1>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>My Profile</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString(
        "en-US",
        {
          month: "long",
          year: "numeric",
        }
      )
    : "—";

  return (
    <div className={styles.container}>

      {/* ================= HEADER ================= */}

      <div className={styles.header}>
        <span className={styles.eyebrow}>
          ACCOUNT
        </span>

        <h1>My Profile</h1>

        <p>
          Manage your AfriWear Care account and
          preferences.
        </p>
      </div>


      {/* ================= PROFILE CARD ================= */}

      <section className={styles.profileCard}>

        <div className={styles.avatar}>
          {initials}
        </div>

        <div className={styles.profileInfo}>
          <h2>{user.name}</h2>

          <p>
            AfriWear Care member
          </p>

          <span>
            {user.role}
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
            <strong>{user.name}</strong>
          </div>

          <div className={styles.infoCard}>
            <span>Email</span>
            <strong>{user.email}</strong>
          </div>

          <div className={styles.infoCard}>
            <span>Account Type</span>
            <strong>{user.role}</strong>
          </div>

          <div className={styles.infoCard}>
            <span>Member Since</span>
            <strong>{memberSince}</strong>
          </div>

        </div>

      </section>


      {/* ================= ACTIVITY ================= */}

      <section className={styles.section}>

        <div className={styles.sectionHeader}>
          <h2>Your Activity</h2>

          <p>
            A quick look at your garment care
            activity.
          </p>
        </div>

        <div className={styles.stats}>

          <div className={styles.statCard}>
            <strong>{scanCount}</strong>
            <span>Total Scans</span>
          </div>

          <div className={styles.statCard}>
            <strong>{garmentCount}</strong>
            <span>Garments Scanned</span>
          </div>

          <div className={styles.statCard}>
            <strong>{textileCount}</strong>
            <span>Textile Types</span>
          </div>


        </div>

      </section>


      {/* ================= PREFERENCES ================= */}

      <section className={styles.section}>

        <div className={styles.sectionHeader}>
          <h2>Preferences</h2>

          <p>
            Choose how AfriWear Care keeps you
            informed.
          </p>
        </div>

        <div className={styles.preferenceCard}>

          <div>
            <strong>Care reminders</strong>

            <p>
              Receive reminders about caring for
              your garments.
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