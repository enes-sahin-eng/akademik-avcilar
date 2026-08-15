import React from "react";
import styles from "./GradeLevelTabs.module.css";
import { getDictionary, type Locale } from "../../dictionaries/getDictionary";
import { GradeLevelTabsClient } from "./GradeLevelTabsClient";

interface GradeLevelTabsProps {
  courseKey: string;
  lang: Locale;
}

export async function GradeLevelTabs({ courseKey, lang }: GradeLevelTabsProps) {
  const dictionary = await getDictionary(lang);
  const tabsData = (dictionary as any)?.[courseKey]?.gradeTabs;

  if (!tabsData || !tabsData.grades || tabsData.grades.length === 0) {
    return null;
  }

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{tabsData.title}</h2>
      {tabsData.desc && <p className={styles.mainDesc}>{tabsData.desc}</p>}
      <GradeLevelTabsClient grades={tabsData.grades} />
    </section>
  );
}
