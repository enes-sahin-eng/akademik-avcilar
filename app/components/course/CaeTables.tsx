import React from "react";
import styles from "./BusinessEnglishTables.module.css";
import { getDictionary, type Locale } from "../../dictionaries/getDictionary";

interface CaeTablesProps {
  lang: Locale;
}

export const CaeTables = async ({ lang }: CaeTablesProps) => {
  const dictionary = await getDictionary(lang);
  const tables = (dictionary as any)?.caeLandingPage?.tables;

  if (!tables) return null;

  const { scoring, dates } = tables;

  return (
    <div className={styles.container}>
      {/* Scoring Table */}
      {scoring && scoring.rows && scoring.rows.length > 0 && (
        <section className={styles.tableSection}>
          <h2 className={styles.title}>{scoring.title}</h2>
          {scoring.desc && <p className={styles.desc}>{scoring.desc}</p>}
          
          <div className={styles.tableWrapper}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  {scoring.headers.map((h: string, i: number) => (
                    <th key={i}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {scoring.rows.map((row: any, i: number) => (
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
      )}

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
    </div>
  );
};
