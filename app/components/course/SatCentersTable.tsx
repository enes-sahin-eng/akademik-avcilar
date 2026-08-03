import React from "react";
import styles from "./BusinessEnglishTables.module.css";
import { getDictionary, type Locale } from "../../dictionaries/getDictionary";

interface SatCentersTableProps {
  lang: Locale;
}

export const SatCentersTable = async ({ lang }: SatCentersTableProps) => {
  const dictionary = await getDictionary(lang);
  const tableData = (dictionary as any)?.satLandingPage?.centersTable;

  if (!tableData || !tableData.rows || tableData.rows.length === 0) return null;

  return (
    <div className={styles.container}>
      <section className={styles.tableSection}>
        <h2 className={styles.title}>{tableData.title}</h2>
        {tableData.desc && <p className={styles.desc}>{tableData.desc}</p>}
        
        <div className={styles.tableWrapper}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                {tableData.headers.map((h: string, i: number) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.rows.map((row: any, i: number) => (
                <tr key={i}>
                  <td className={styles.termCell}>{row.city}</td>
                  <td>{row.center}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {tableData.footer && <p className={styles.footerText}>{tableData.footer}</p>}
      </section>
    </div>
  );
};
