"use client";

import React, { useState } from "react";
import { BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./Leaderboard.module.css";
import { useDictionary } from "../../src/context/DictionaryContext";

const dummyData = [
  { name: "E**** Y*****", program: "IELTS", score: "7.5" },
  { name: "A**** G****", program: "IELTS", score: "8.0" },
  { name: "G******* Y*******", program: "IELTS", score: "7.5" },
  { name: "T**** K******", program: "IELTS", score: "8.0" },
  { name: "E**** Y******", program: "IELTS", score: "7.5" },
  { name: "M**** Y*****", program: "IELTS", score: "7.0" },
  { name: "M**** A**", program: "IELTS", score: "7.5" },
];

export const Leaderboard = () => {
  const dict = useDictionary();
  const content = dict?.homeContentSection?.leaderboard;
  const [activeTab, setActiveTab] = useState("IELTS");

  if (!content) return null;

  return (
    <motion.div 
      className={styles.leaderboardCard}
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          <BarChart3 size={28} />
          <h3 className={styles.title}>{content.title}</h3>
        </div>
        <p className={styles.subtitle}>{content.subtitle}</p>
      </div>

      <div className={styles.tabsContainer}>
        {content.tabs.map((tab: string) => (
          <button 
            key={tab} 
            className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.tableHeader}>
        <span>{content.headers.name}</span>
        <span>{content.headers.program}</span>
        <span>{content.headers.score}</span>
      </div>

      <div className={styles.tableBody}>
        {dummyData.map((row, idx) => (
          <motion.div 
            key={idx} 
            className={styles.tableRow}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <span>{row.name}</span>
            <span>{row.program}</span>
            <span className={styles.scoreCell}>{row.score}</span>
          </motion.div>
        ))}
      </div>

      <motion.button 
        className={styles.btnAll}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content.btnAll}
      </motion.button>
    </motion.div>
  );
};
