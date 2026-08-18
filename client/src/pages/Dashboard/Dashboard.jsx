import WelcomeCard from "../../components/dashboard/WelcomeCard/WelcomeCard";
import OverviewStats from "../../components/dashboard/OverviewStats/OverviewStats";
import QuickActions from "../../components/dashboard/QuickActions/QuickActions";
import RecentScans from "../../components/dashboard/RecentScans/RecentScans";
import TextileSpotlight from "../../components/dashboard/TextileSpotlight/TextileSpotlight";

import styles from "./Dashboard.module.css";

function Dashboard() {
  return (
    <main className={styles.container}>
      <WelcomeCard />

      <OverviewStats />

      <QuickActions />

      <RecentScans />

      <TextileSpotlight />
    </main>
  );
}

export default Dashboard;