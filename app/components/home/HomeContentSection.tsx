"use client";

import React from "react";
import styles from "./HomeContentSection.module.css";
import { HappyHoursBanner } from "./HappyHoursBanner";
import { HomeArticle } from "./HomeArticle";
import { FAQSection } from "./FAQSection";
import { MapsEmbed } from "../ui/MapsEmbed";
import { Leaderboard } from "./Leaderboard";
import { UpcomingProgramsTable } from "./UpcomingProgramsTable";
import { ProgramTabsSection } from "./ProgramTabsSection";
import { useDictionary } from "../../../src/context/DictionaryContext";
import { motion } from "framer-motion";

export const HomeContentSection = () => {
  const dict = useDictionary();
  const programsTitle = dict?.homeContentSection?.programsTitle;

  return (
    <section className={styles.sectionContainer}>
      <div className={styles.grid}>
        
        {/* Left Column */}
        <div className={styles.leftColumn}>
          <HappyHoursBanner />
          <HomeArticle />
          <FAQSection />
        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          <MapsEmbed />
          <Leaderboard />
        </div>
      </div>

      <ProgramTabsSection />

      {programsTitle && (
        <motion.h2 
          className={styles.programsTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {programsTitle}
        </motion.h2>
      )}

      <UpcomingProgramsTable />
    </section>
  );
};
