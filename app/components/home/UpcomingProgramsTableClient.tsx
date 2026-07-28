"use client";

import React from "react";
import styles from "./UpcomingProgramsTable.module.css";
import { motion } from "framer-motion";

interface Props {
  tableData: any;
}

export const UpcomingProgramsTableClient = ({ tableData }: Props) => {
  if (!tableData) return null;
  
  return (
    <motion.div 
      className={styles.tableWrapper}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.gridContainer}>
        {tableData.programs.map((prog: any, i: number) => (
          <motion.div 
            key={i} 
            className={`${styles.programCard} ${prog.status === 'full' ? styles.cardFull : styles.cardAvailable}`}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className={styles.cardHeader}>
              <h3 className={styles.programName}>{prog.code}</h3>
              <span className={`${styles.statusBadge} ${prog.status === 'full' ? styles.badgeFull : styles.badgeAvailable}`}>
                {prog.status === "full" ? tableData.statusFull : tableData.statusAvailable}
              </span>
            </div>
            
            <div className={styles.cardBody}>
              <div className={styles.dateInfo}>
                <div className={styles.dateItem}>
                  <span className={styles.dateLabel}>{tableData.headers[1]}</span>
                  <span className={styles.dateValue}>{prog.start}</span>
                </div>
                <div className={styles.dateDivider}></div>
                <div className={styles.dateItem}>
                  <span className={styles.dateLabel}>{tableData.headers[2]}</span>
                  <span className={styles.dateValue}>{prog.end}</span>
                </div>
              </div>
            </div>

            <div className={styles.cardFooter}>
              <a href="#" className={styles.detailBtn}>
                {tableData.detailBtn}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
