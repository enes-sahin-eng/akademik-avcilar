import React from "react";
import styles from "./BusinessEnglishTables.module.css";
import { getDictionary, type Locale } from "../../dictionaries/getDictionary";

interface ArapcaTablesProps {
  lang: Locale;
}

export const ArapcaTables = async ({ lang }: ArapcaTablesProps) => {
  const dictionary = await getDictionary(lang);
  const tables = (dictionary as any)?.arapcaLandingPage?.tables;

  if (!tables) return null;

  const { countries } = tables;

  return (
    <div className={styles.container}>
      {/* Countries Table */}
      {countries && countries.rows && countries.rows.length > 0 && (
        <section className={styles.tableSection}>
          <h2 className={styles.title}>{countries.title}</h2>
          {countries.desc && <p className={styles.desc}>{countries.desc}</p>}
          
          <div className={styles.tableWrapper}>
            <table className={styles.dataTable}>
              <tbody>
                {countries.rows.map((row: any, i: number) => (
                  <tr key={i}>
                    <td className={styles.termCell}>{row.col1}</td>
                    <td className={styles.termCell}>{row.col2}</td>
                    <td className={styles.termCell}>{row.col3}</td>
                    <td className={styles.termCell}>{row.col4}</td>
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
