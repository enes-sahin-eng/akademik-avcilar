import React from "react";
import { getDictionary, type Locale } from "../../dictionaries/getDictionary";
import styles from "./PublicationsIntroSection.module.css";

interface Props {
  courseKey: string;
  lang: Locale;
}

export const PublicationsIntroSection = async ({ courseKey, lang }: Props) => {
  const dict = await getDictionary(lang);
  const intro = (dict as any)?.[courseKey]?.intro;

  if (!intro) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{intro.title}</h2>
        <div className={styles.content}>
          {intro.paragraphs?.map((p: string, idx: number) => (
            <p key={idx} className={styles.paragraph}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
};
