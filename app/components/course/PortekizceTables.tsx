import React from "react";
import styles from "./BusinessEnglishTables.module.css";
import { getDictionary, type Locale } from "../../dictionaries/getDictionary";

interface PortekizceTablesProps {
  lang: Locale;
}

export const PortekizceTables = async ({ lang }: PortekizceTablesProps) => {
  const dictionary = await getDictionary(lang);
  const tables = (dictionary as any)?.portekizceLandingPage?.tables;

  if (!tables) return null;

  const { levels } = tables;

  return (
    <div className={styles.container}>
      {/* Levels Table */}
      {levels && levels.rows && levels.rows.length > 0 && (
        <section className={styles.tableSection}>
          <h2 className={styles.title}>{levels.title}</h2>
          {levels.desc && <p className={styles.desc}>{levels.desc}</p>}
          
          <div className={styles.tableWrapper}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  {levels.headers.map((h: string, i: number) => (
                    <th key={i}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {levels.rows.map((row: any, i: number) => (
                  <tr key={i}>
                    <td className={styles.termCell}>{row.col1}</td>
                    <td className={styles.termCell}>{row.col2}</td>
                    <td>{row.col3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {levels.footnote && <p className={styles.desc} style={{marginTop: '1rem'}}>{levels.footnote}</p>}
        </section>
      )}
    </div>
  );
};
