import React from "react";
import styles from "./BusinessEnglishTables.module.css";
import { getDictionary, type Locale } from "../../dictionaries/getDictionary";

interface CilsTablesProps {
  lang: Locale;
}

export const CilsTables = async ({ lang }: CilsTablesProps) => {
  const dictionary = await getDictionary(lang);
  const tables = (dictionary as any)?.cilsLandingPage?.tables;

  if (!tables) return null;

  const { format, fees } = tables;

  return (
    <div className={styles.container}>
      {/* Format Table */}
      {format && format.rows && format.rows.length > 0 && (
        <section className={styles.tableSection}>
          <h2 className={styles.title}>{format.title}</h2>
          {format.desc && <p className={styles.desc}>{format.desc}</p>}
          
          <div className={styles.tableWrapper}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  {format.headers.map((h: string, i: number) => (
                    <th key={i}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {format.rows.map((row: any, i: number) => (
                  <tr key={i}>
                    <td className={styles.termCell}>{row.col1}</td>
                    <td className={styles.termCell}>{row.col2}</td>
                    <td>{row.col3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Fees Table */}
      {fees && fees.rows && fees.rows.length > 0 && (
        <section className={styles.tableSection}>
          <h2 className={styles.title}>{fees.title}</h2>
          {fees.desc && <p className={styles.desc}>{fees.desc}</p>}
          
          <div className={styles.tableWrapper}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  {fees.headers.map((h: string, i: number) => (
                    <th key={i}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fees.rows.map((row: any, i: number) => (
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
