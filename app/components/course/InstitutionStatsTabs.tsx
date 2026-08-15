import React from "react";
import { getDictionary } from "../../dictionaries/getDictionary";
import styles from "./InstitutionStatsTabs.module.css";

interface Props {
  courseKey: string;
  lang: string;
}

// Kalınlaştırmak için yardımcı fonksiyon (Örn: "**Konuşma Pratiği:**" kısmını <strong> yapar)
function formatRichText(text: string) {
  const parts = text.split("**");
  if (parts.length > 1) {
    return (
      <>
        {parts.map((part, i) => 
          i % 2 === 1 ? <strong key={i}>{part}</strong> : <React.Fragment key={i}>{part}</React.Fragment>
        )}
      </>
    );
  }
  return text;
}

export async function InstitutionStatsTabs({ courseKey, lang }: Props) {
  const dict = await getDictionary(lang as "tr" | "en" | "ar");
  const data = (dict as any)?.[courseKey]?.institutionStatsTabs;

  if (!data?.tabs || data.tabs.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        {data.header && (
          <div className={styles.header}>
            <h2 className={styles.title}>{data.header.title}</h2>
            <p className={styles.subtitle}>{data.header.subtitle}</p>
          </div>
        )}

        {/* CSS-only sekme mantığı için gizli radio inputlar */}
        {data.tabs.map((tab: any, i: number) => (
          <input
            key={`input-${i}`}
            type="radio"
            id={`statTab${i}`}
            name="statTabs"
            className={styles.tabInput}
            defaultChecked={i === 0}
            aria-label={tab.label}
          />
        ))}

        {/* Sekme Navigasyonu */}
        <nav className={styles.tabNav} aria-label="İstatistik ve Kalite Sekmeleri">
          {data.tabs.map((tab: any, i: number) => (
            <label
              key={`label-${i}`}
              htmlFor={`statTab${i}`}
              className={`${styles.tabLabel} ${styles[`label${i}`]}`}
            >
              {tab.label}
            </label>
          ))}
        </nav>

        {/* İçerik Panelleri */}
        <div className={styles.panels}>
          {data.tabs.map((tab: any, i: number) => {
            const leftSection = tab.sections[0];
            const rightSection = tab.sections[1];

            return (
              <div key={`panel-${i}`} className={`${styles.panel} ${styles[`panel${i}`]}`}>
                
                {/* Sol Sütun */}
                {leftSection && (
                  <div className={styles.panelLeft}>
                    <h3 className={styles.sectionTitle}>{leftSection.title}</h3>
                    <p className={styles.sectionContent}>{leftSection.content}</p>
                    {leftSection.list && (
                      <ul className={styles.richList}>
                        {leftSection.list.map((item: string, idx: number) => (
                          <li key={idx} className={styles.listItem}>
                            {formatRichText(item)}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {/* Sağ Sütun */}
                {rightSection && (
                  <div className={styles.panelRight}>
                    <h3 className={styles.sectionTitle}>{rightSection.title}</h3>
                    <p className={styles.sectionContent}>{rightSection.content}</p>
                    {rightSection.list && (
                      <ul className={styles.richList}>
                        {rightSection.list.map((item: string, idx: number) => (
                          <li key={idx} className={styles.listItem}>
                            {formatRichText(item)}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
