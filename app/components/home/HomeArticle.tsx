import React from "react";
import styles from "./HomeArticle.module.css";
import anim from "../motion/animations.module.css";
import { getDictionary, type Locale } from "../../dictionaries/getDictionary";
import { ExpandableArticle } from "./ExpandableArticle";

interface Props {
  lang: Locale;
}

const highlightKeywords = [
  "Avcılar'da En İyi İngilizce Kursu",
  "Avcılar İngilizce Kursları",
  "Avcılar İngilizce Kursu",
  "Avcılar'ın En Çok Tavsiye Edilen İngilizce Kursu",
  "Avcılar İngilizce Dil Kursu",
  "Genel İngilizce",
  "YKS-DİL (YDT) Hazırlık Kursu",
  "TOEFL",
  "IELTS",
];

function highlightText(text: string) {
  const regex = new RegExp(
    `(${highlightKeywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "g"
  );
  const parts = text.split(regex);
  return parts.map((part, i) =>
    highlightKeywords.includes(part) ? (
      <strong key={i} className={styles.highlightText}>{part}</strong>
    ) : (
      part
    )
  );
}

export const HomeArticle = async ({ lang }: Props) => {
  const dict = await getDictionary(lang);
  const content = (dict as any)?.homeContentSection?.article;

  if (!content) return null;

  return (
    <article className={styles.articleContainer}>
      {/* h1 — sayfanın tek gerçek, görünür başlığı */}
      {content.h1 && (
        <h1 className={`${styles.heading} ${anim.fadeUp1}`}>
          {content.h1}
        </h1>
      )}

      {/* p1 — her zaman görünür, CSS animasyonu */}
      <p
        className={`${styles.paragraph} ${anim.fadeUp1}`}
        dangerouslySetInnerHTML={{ __html: content.p1 }}
      />

      {/* h2 — her zaman görünür */}
      <h2 className={`${styles.heading} ${anim.fadeUp2}`}>
        {content.h2}
      </h2>

      {/* p2 — her zaman görünür */}
      <p 
        className={`${styles.paragraph} ${anim.fadeUp3}`}
        dangerouslySetInnerHTML={{ __html: content.p2 }}
      />

      {/* Genişleyen içerik — tıklanınca açılır (SEO açısından da HTML'de mevcut) */}
      <ExpandableArticle
        readMoreText={content.readMore}
        readLessText={content.readLess}
      >
        {content.expandedContent &&
          content.expandedContent.map((item: any, index: number) => {
            if (item.type === "h3") {
              return (
                <h3 key={index} className={styles.subHeading}>
                  {item.text}
                </h3>
              );
            }
            if (item.type === "p") {
              return (
                <p
                  key={index}
                  className={styles.paragraph}
                  dangerouslySetInnerHTML={{ __html: item.text }}
                />
              );
            }
            if (item.type === "ul" && Array.isArray(item.items)) {
              return (
                <ul key={index} className={styles.bulletList}>
                  {item.items.map((bullet: string, idx: number) => (
                    <li
                      key={idx}
                      className={styles.bulletItem}
                      dangerouslySetInnerHTML={{ __html: bullet }}
                    />
                  ))}
                </ul>
              );
            }
            return null;
          })}
      </ExpandableArticle>
    </article>
  );
};
