import React from "react";
import styles from "./BusinessEnglishTables.module.css";
import { getDictionary, type Locale } from "../../dictionaries/getDictionary";

interface RuscaTablesProps {
  lang: Locale;
}

export const RuscaTables = async ({ lang }: RuscaTablesProps) => {
  const dictionary = await getDictionary(lang);
  const tables = (dictionary as any)?.ruscaLandingPage?.tables;

  if (!tables) return null;

  const { pricing } = tables;

  return (
    <div className={styles.container}>
      {/* Pricing Table */}
      {pricing && pricing.rows && pricing.rows.length > 0 && (
        <section className={styles.tableSection}>
          <h2 className={styles.title}>{pricing.title}</h2>
          {pricing.desc && <p className={styles.desc}>{pricing.desc}</p>}
          
          <div className={styles.tableWrapper}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  {pricing.headers.map((h: string, i: number) => (
                    <th key={i}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pricing.rows.map((row: any, i: number) => (
                  <tr key={i}>
                    <td className={styles.termCell}>{row.col1}</td>
                    <td>{row.col2}</td>
                    <td>{row.col3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {pricing.footnote && <p className={styles.desc} style={{marginTop: '1rem'}}>{pricing.footnote}</p>}
        </section>
      )}
    </div>
  );
};
