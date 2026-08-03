import React from "react";
import { getDictionary, type Locale } from "../../dictionaries/getDictionary";
import { CheckCircle2, AlertCircle } from "lucide-react";
import styles from "./CourseProsConsTable.module.css";

interface CourseProsConsTableProps {
  courseKey: string;
  lang: Locale;
}

export async function CourseProsConsTable({
  courseKey,
  lang,
}: CourseProsConsTableProps) {
  const dictionary = await getDictionary(lang);
  const tableData = (dictionary as any)?.[courseKey]?.prosConsTable;

  if (!tableData || !tableData.rows || tableData.rows.length === 0) {
    return null;
  }

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{tableData.title}</h2>
      
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thPro}>{tableData.headers[0]}</th>
              <th className={styles.thCon}>{tableData.headers[1]}</th>
            </tr>
          </thead>
          <tbody>
            {tableData.rows.map((row: any, index: number) => (
              <tr key={index}>
                <td className={styles.tdPro}>
                  <div className={styles.tdContent}>
                    <CheckCircle2 className={styles.iconPro} size={20} />
                    <span>{row.pro}</span>
                  </div>
                </td>
                <td className={styles.tdCon}>
                  <div className={styles.tdContent}>
                    <AlertCircle className={styles.iconCon} size={20} />
                    <span>{row.con}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
