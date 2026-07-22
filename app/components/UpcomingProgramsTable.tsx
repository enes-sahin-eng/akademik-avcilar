import React from "react";
import styles from "./UpcomingProgramsTable.module.css";
import { motion } from "framer-motion";
import { useDictionary } from "../../src/context/DictionaryContext";

export const UpcomingProgramsTable = () => {
  const dict = useDictionary();
  const tableData = (dict as any)?.homeContentSection?.upcomingProgramsTable;

  if (!tableData) return null;
  return (
    <motion.div 
      className={styles.tableWrapper}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.tableResponsive}>
        <table className={styles.table}>
          <thead>
            <tr>
              {tableData.headers.map((header: string, i: number) => (
                <th key={i}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.programs.map((prog: any, i: number) => (
              <tr key={i} className={prog.status === "full" ? styles.rowFull : (i % 2 === 0 ? styles.rowEven : styles.rowOdd)}>
                <td className={styles.colCode}>{prog.code}</td>
                <td>{prog.start}</td>
                <td>{prog.end}</td>
                <td>
                  <span className={`${styles.badge} ${prog.status === "full" ? styles.badgeFull : styles.badgeAvailable}`}>
                    {prog.status === "full" ? tableData.statusFull : tableData.statusAvailable}
                  </span>
                </td>
                <td>
                  <a href="#" className={styles.detailBtn}>{tableData.detailBtn}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
