"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import styles from "./GradeLevelTabs.module.css";

interface Grade {
  tabTitle: string;
  title: string;
  desc?: string;
  bullets: string[];
  summary?: string;
}

interface Props {
  grades: Grade[];
}

/**
 * Sekme geçişini ve animasyonu yöneten client bileşen. Tüm metinler server
 * component'tan prop olarak gelir; sözlüğe erişmez.
 */
export const GradeLevelTabsClient = ({ grades }: Props) => {
  const [activeTab, setActiveTab] = useState(0);
  const active = grades[activeTab];

  return (
    <>
      <div className={styles.tabsContainer}>
        {grades.map((grade, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`${styles.tabBtn} ${activeTab === index ? styles.activeTab : ""}`}
          >
            {grade.tabTitle}
          </button>
        ))}
      </div>

      <div className={styles.contentWrapper}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className={styles.contentTitle}>{active.title}</h3>

            {active.desc && <p className={styles.contentDesc}>{active.desc}</p>}

            <ul className={styles.bulletList}>
              {active.bullets.map((bullet, idx) => (
                <li key={idx} className={styles.bulletItem}>
                  <div className={styles.iconWrapper}>
                    <CheckCircle2 size={18} />
                  </div>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {active.summary && (
              <div className={styles.contentSummary}>{active.summary}</div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};
