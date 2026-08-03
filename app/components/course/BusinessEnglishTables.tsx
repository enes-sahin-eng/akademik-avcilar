import React from "react";
import styles from "./BusinessEnglishTables.module.css";
import { getDictionary, type Locale } from "../../dictionaries/getDictionary";

interface BusinessEnglishTablesProps {
  lang: Locale;
}

export const BusinessEnglishTables = async ({ lang }: BusinessEnglishTablesProps) => {
  const dictionary = await getDictionary(lang);
  const courseData = (dictionary as any)?.businessEnglishLandingPage;

  if (!courseData) return null;

  const vocabData = courseData.vocabTable;
  const emailData = courseData.emailTable;

  return (
    <div className={styles.container}>
      {/* Vocab Table */}
      {vocabData && (
        <section className={styles.tableSection}>
          <h2 className={styles.title}>{vocabData.title}</h2>
          <p className={styles.desc}>{vocabData.desc}</p>
          
          <div className={styles.tableWrapper}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  {vocabData.headers.map((h: string, i: number) => (
                    <th key={i}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {vocabData.rows.map((row: any, i: number) => (
                  <tr key={i}>
                    <td className={styles.termCell}>{row.term}</td>
                    <td>{row.translation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {vocabData.footer && <p className={styles.footerText}>{vocabData.footer}</p>}
        </section>
      )}

      {/* Email Table */}
      {emailData && (
        <section className={styles.tableSection}>
          <h2 className={styles.title}>{emailData.title}</h2>
          <p className={styles.desc}>{emailData.desc}</p>
          
          <div className={styles.tableWrapper}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  {emailData.headers.map((h: string, i: number) => (
                    <th key={i}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {emailData.rows.map((row: any, i: number) => (
                  <tr key={i}>
                    <td className={styles.termCell}>{row.category}</td>
                    <td>{row.subject}</td>
                    <td className={styles.contentCell}>{row.content}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {emailData.footer && <p className={styles.footerText}>{emailData.footer}</p>}
        </section>
      )}
    </div>
  );
};
