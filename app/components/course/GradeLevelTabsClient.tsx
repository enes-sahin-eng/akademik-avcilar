"use client";

import React, { useState } from "react";
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
 * Sekme geçişini yöneten client bileşen. Tüm metinler server
 * component'tan prop olarak gelir; sözlüğe erişmez.
 *
 * SEO/GEO NOTU: Tüm sekme içerikleri her zaman DOM'da bulunur.
 * Görünürlük CSS class'larıyla (tabPanel / tabPanelActive) kontrol edilir.
 * Google botları butona basmadan tüm içerikleri görebilir.
 */
export const GradeLevelTabsClient = ({ grades }: Props) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      {/* Sekme butonları */}
      <div className={styles.tabsContainer}>
        {grades.map((grade, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`${styles.tabBtn} ${activeTab === index ? styles.activeTab : ""}`}
            aria-selected={activeTab === index}
            aria-controls={`grade-panel-${index}`}
            id={`grade-tab-${index}`}
            role="tab"
          >
            {grade.tabTitle}
          </button>
        ))}
      </div>

      {/* Tüm panel içerikleri her zaman DOM'da — SEO botları hepsini görür */}
      <div className={styles.contentWrapper}>
        {grades.map((grade, index) => (
          <div
            key={index}
            id={`grade-panel-${index}`}
            role="tabpanel"
            aria-labelledby={`grade-tab-${index}`}
            className={
              activeTab === index ? styles.tabPanel : styles.tabPanelHidden
            }
          >
            <h3 className={styles.contentTitle}>{grade.title}</h3>

            {grade.desc && (
              <p className={styles.contentDesc}>{grade.desc}</p>
            )}

            <ul className={styles.bulletList}>
              {grade.bullets.map((bullet, idx) => (
                <li key={idx} className={styles.bulletItem}>
                  <div className={styles.iconWrapper}>
                    <CheckCircle2 size={18} />
                  </div>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {grade.summary && (
              <div className={styles.contentSummary}>{grade.summary}</div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
