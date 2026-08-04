"use client";

import React, { useState } from "react";
import styles from "./Leaderboard.module.css";

interface Props {
  tabs: string[];
}

/**
 * Sadece aktif sekme durumunu tutan client bileşen.
 * Sekme etiketleri server component'tan prop olarak gelir.
 */
export const LeaderboardTabs = ({ tabs }: Props) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className={styles.tabsContainer}>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ""}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
