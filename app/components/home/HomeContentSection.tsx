import React from "react";
import styles from "./HomeContentSection.module.css";
import { HappyHoursBanner } from "./HappyHoursBanner";
import { HomeArticle } from "./HomeArticle";
import { FAQSection } from "./FAQSection";
import { Leaderboard } from "./Leaderboard";
import { UpcomingProgramsTable } from "./UpcomingProgramsTable";
import { ProgramTabsSection } from "./ProgramTabsSection";
import { MapsEmbed } from "../ui/MapsEmbed";
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
        <div className={styles.grid}>

          {/* Sol kolon — SEO kritik metinler, Reveal/framer-motion YOK */}
          <div className={styles.leftColumn}>
            <HappyHoursBanner lang={lang} />
            <HomeArticle lang={lang} />
            <FAQSection lang={lang} />
          </div>

          {/* Sağ kolon */}
          <div className={styles.rightColumn}>
            <Leaderboard lang={lang} />
            <MapsEmbed />
          </div>
        </div>

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
