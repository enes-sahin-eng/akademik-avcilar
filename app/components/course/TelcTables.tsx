import React from "react";
import styles from "./BusinessEnglishTables.module.css";
import { getDictionary, type Locale } from "../../dictionaries/getDictionary";

interface TelcTablesProps {
  lang: Locale;
}

export const TelcTables = async ({ lang }: TelcTablesProps) => {
  const dictionary = await getDictionary(lang);
  const tables = (dictionary as any)?.telcLandingPage?.tables;

  if (!tables) return null;

  const { dates, centers } = tables;

  return (
    <div className={styles.container}>
      {/* Dates Table */}
      {dates && dates.rows && dates.rows.length > 0 && (
        <section className={styles.tableSection}>
          <h2 className={styles.title}>{dates.title}</h2>
          {dates.desc && <p className={styles.desc}>{dates.desc}</p>}
          
          <div className={styles.tableWrapper}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  {dates.headers.map((h: string, i: number) => (
                    <th key={i}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dates.rows.map((row: any, i: number) => (
                  <tr key={i}>
                    <td className={styles.termCell}>{row.col1}</td>
                    <td>{row.col2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Centers Table */}
      {centers && centers.rows && centers.rows.length > 0 && (
        <section className={styles.tableSection}>
          <h2 className={styles.title}>{centers.title}</h2>
          {centers.desc && <p className={styles.desc}>{centers.desc}</p>}
          
          <div className={styles.tableWrapper}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  {centers.headers.map((h: string, i: number) => (
                    <th key={i}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {centers.rows.map((row: any, i: number) => (
                  <tr key={i}>
                    <td className={styles.termCell}>{row.col1}</td>
                    <td>{row.col2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
};
