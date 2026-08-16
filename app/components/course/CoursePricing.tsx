import React from "react";
import styles from "./CoursePricing.module.css";
import { getDictionary, type Locale } from "../../dictionaries/getDictionary";

interface Props {
  courseKey: string;
  lang: Locale;
}

export const CoursePricing = async ({ courseKey, lang }: Props) => {
  const dictionary = await getDictionary(lang);
  const data = (dictionary as any)[courseKey]?.coursePricing;

  if (!data) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{data.title}</h2>
          <p className={styles.description}>{data.description}</p>
        </div>
      </div>
    </section>
  );
};
