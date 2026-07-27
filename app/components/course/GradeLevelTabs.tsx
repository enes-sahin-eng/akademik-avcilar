"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDictionary } from "../../../src/context/DictionaryContext";
import { CheckCircle2 } from "lucide-react";
import styles from "./GradeLevelTabs.module.css";

interface GradeLevelTabsProps {
  courseKey: string;
}

export function GradeLevelTabs({ courseKey }: GradeLevelTabsProps) {
  const dictionary = useDictionary();
  const [activeTab, setActiveTab] = useState(0);

  const tabsData = (dictionary as any)?.[courseKey]?.gradeTabs;

  if (!tabsData || !tabsData.grades || tabsData.grades.length === 0) {
    return null;
  }

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{tabsData.title}</h2>
      
      <div className={styles.tabsContainer}>
        {tabsData.grades.map((grade: any, index: number) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`${styles.tabBtn} ${activeTab === index ? styles.activeTab : ''}`}
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
            <h3 className={styles.contentTitle}>{tabsData.grades[activeTab].title}</h3>
            
            {tabsData.grades[activeTab].desc && (
              <p className={styles.contentDesc}>{tabsData.grades[activeTab].desc}</p>
            )}

            <ul className={styles.bulletList}>
              {tabsData.grades[activeTab].bullets.map((bullet: string, idx: number) => (
                <li key={idx} className={styles.bulletItem}>
                  <div className={styles.iconWrapper}>
                    <CheckCircle2 size={18} />
                  </div>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {tabsData.grades[activeTab].summary && (
              <div className={styles.contentSummary}>
                {tabsData.grades[activeTab].summary}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
