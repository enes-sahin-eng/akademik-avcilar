import React from "react";
import styles from "./HomeContentSection.module.css";
import { HomeArticle } from "./HomeArticle";
import { FAQSection } from "./FAQSection";
import { UpcomingProgramsTable } from "./UpcomingProgramsTable";
import { ProgramTabsSection } from "./ProgramTabsSection";
import { getDictionary, type Locale } from "../../dictionaries/getDictionary";

interface Props {
  lang: Locale;
}

export const HomeContentSection = async ({ lang }: Props) => {
  const dict = await getDictionary(lang);
  const programsTitle = (dict as any)?.homeContentSection?.programsTitle;

  return (
    <>
      <section className={styles.sectionContainer}>
        <div className={styles.contentWrapper}>
          <HomeArticle lang={lang} />
        </div>
      </section>

      {/* FAQSection moved outside to allow 100% width */}
      <FAQSection lang={lang} />

      <section className={styles.sectionContainer}>
        <ProgramTabsSection lang={lang} />
      </section>

      <section className={styles.fullWidthBeige}>
        <div className={styles.innerContainer}>
          {programsTitle && (
            <h2 className={styles.programsTitle}>{programsTitle}</h2>
          )}
          
          <UpcomingProgramsTable lang={lang} />
        </div>
      </section>
    </>
  );
};
