"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Book, BookOpen, FileBadge, Award, Trophy, PenTool } from "lucide-react";
import styles from "./MegaMenu.module.css";
import { useDictionary } from "../../src/context/DictionaryContext";

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  Book,
  BookOpen,
  FileBadge,
  Award,
  Trophy,
  PenTool
};

export const MegaMenuSinav: React.FC = () => {
  const dict = useDictionary();
  const megaMenu = dict?.megaMenuSinav;

  if (!megaMenu) return null;

  const renderSection = (section: any, idx: number) => {
    const Icon = iconMap[section.icon] || GraduationCap;
    return (
      <a href={`#${section.title}`} key={idx} className={styles.sinavSection}>
        <div className={styles.sinavIconWrapper}>
          <Icon size={24} strokeWidth={1.5} />
        </div>
        <div>
          <div className={styles.sectionTitle}>{section.title}</div>
          <p className={styles.sectionSubtitle}>{section.subtitle}</p>
        </div>
      </a>
    );
  };

  return (
    <motion.div
      className={`${styles.megaMenuContainer} ${styles.sinavContainer}`}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
    >
      <div className={`${styles.megaMenuLeft} ${styles.megaMenuLeftPadded}`}>
        <div className={`${styles.megaMenuColumns} ${styles.megaMenuColumnsThree}`}>
          <div className={`${styles.col} ${styles.colMedium}`}>
            {megaMenu.col1.map(renderSection)}
          </div>
          <div className={`${styles.col} ${styles.colMedium}`}>
            {megaMenu.col2.map(renderSection)}
          </div>
          <div className={`${styles.col} ${styles.colMedium}`}>
            {megaMenu.col3.map(renderSection)}
          </div>
        </div>
      </div>

      <div className={styles.megaMenuRightImage}>
        <img 
          src="https://picsum.photos/seed/graduates/300/400" 
          alt="Sınav Kursları" 
          className={styles.rightFullImage} 
        />
      </div>
    </motion.div>
  );
};
