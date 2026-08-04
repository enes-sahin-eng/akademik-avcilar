import React from "react";
import styles from "./ProgramTabsSection.module.css";
import { getDictionary, type Locale } from "../../dictionaries/getDictionary";
import { ProgramTabsClient } from "./ProgramTabsClient";

interface Props {
  lang: Locale;
}

export const ProgramTabsSection = async ({ lang }: Props) => {
  const dict = await getDictionary(lang);
  const t = (dict as any)?.programTabsSection;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          {t?.title ||
            "Avcılar Yabancı Dil Kursu Kampüsümüzde Verilen Programlar"}
        </h2>
        <p className={styles.subtitle}>
          {t?.subtitle ||
            "Avcılar Yabancı Dil Kursu - En İyi Yabancı Dil Eğitim Merkezi Tavsiye Avcılar"}
        </p>

        <ProgramTabsClient t={t} />
      </div>
    </section>
  );
};
