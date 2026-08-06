import React from "react";
import { Check } from "lucide-react";
import { getDictionary, type Locale } from "../../dictionaries/getDictionary";
import styles from "./SeoContentBlock.module.css";

interface SeoContentBlockProps {
  courseKey: string;
  lang: Locale;
}

export async function SeoContentBlock({ courseKey, lang }: SeoContentBlockProps) {
  const dictionary = await getDictionary(lang);
  const seoData = (dictionary as any)?.[courseKey]?.seoContent;

  if (!seoData || seoData.length === 0) return null;

  return (
    <section className={styles.container}>
      {seoData.map((block: any, index: number) => {
        const HeadingTag = block.level || "h2";
        return (
          <div key={index} className={styles.block}>
            <HeadingTag className={styles.title}>{block.title}</HeadingTag>

            {block.desc && (
              <div 
                className={styles.desc} 
                dangerouslySetInnerHTML={{ __html: block.desc }} 
              />
            )}

            {block.table && (
              <div className={styles.tableWrapper}>
                <table className={styles.seoTable}>
                  <thead>
                    <tr>
                      {block.table.headers.map((h: string, i: number) => (
                        <th key={i}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.table.rows.map((row: string[], i: number) => (
                      <tr key={i}>
                        {row.map((cell: string, j: number) => (
                          <td key={j} dangerouslySetInnerHTML={{ __html: cell }} />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {block.bullets && block.bullets.length > 0 && (
              <ul className={`${styles.bulletList} ${block.summary ? styles.hasSummary : ""}`}>
                {block.bullets.map((bullet: string, idx: number) => (
                  <li key={idx} className={styles.bulletItem}>
                    {block.bulletStyle === "none" ? (
                       <span style={{ marginRight: '8px' }}></span>
                    ) : block.bulletStyle === "triangle" ? (
                      <span className={styles.triangleIcon}>►</span>
                    ) : block.bulletStyle === "diamond" ? (
                       <span className={styles.diamondIcon}>♦</span>
                    ) : (
                      <div className={styles.iconWrapper}>
                        <Check size={20} />
                      </div>
                    )}
                    <span dangerouslySetInnerHTML={{ __html: bullet }} />
                  </li>
                ))}
              </ul>
            )}

            {block.summary && (
              <div 
                className={styles.summary} 
                dangerouslySetInnerHTML={{ __html: block.summary }} 
              />
            )}
          </div>
        );
      })}
    </section>
  );
}
