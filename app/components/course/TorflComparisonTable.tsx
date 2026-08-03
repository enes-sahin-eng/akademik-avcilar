import React from "react";
import styles from "./BusinessEnglishTables.module.css";
import { getDictionary, type Locale } from "../../dictionaries/getDictionary";

interface TorflComparisonTableProps {
  lang: Locale;
}

export const TorflComparisonTable = async ({ lang }: TorflComparisonTableProps) => {
  const dictionary = await getDictionary(lang);
  const tableData = (dictionary as any)?.torflLandingPage?.comparisonTable;

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
                  <td className={styles.termCell}>{row.col1}</td>
                  <td className={styles.termCell}>{row.col2}</td>
                  <td>{row.col3}</td>
                  <td>{row.col4}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
