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
      {seoData.map((block: any, index: number) => (
        <div key={index} className={styles.block}>
          <h2 className={styles.title}>{block.title}</h2>

          {block.desc && <p className={styles.desc}>{block.desc}</p>}

          {block.bullets && block.bullets.length > 0 && (
            <ul className={`${styles.bulletList} ${block.summary ? styles.hasSummary : ""}`}>
              {block.bullets.map((bullet: string, idx: number) => (
                <li key={idx} className={styles.bulletItem}>
                  <div className={styles.iconWrapper}>
                    <Check size={20} />
                  </div>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}

          {block.summary && (
            <div className={styles.summary}>{block.summary}</div>
          )}
        </div>
      ))}
    </section>
  );
}
