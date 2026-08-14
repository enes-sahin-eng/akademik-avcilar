"use client";
import Image from 'next/image';

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Castle, Building, Landmark, Building2, Snowflake, Moon, Globe2, Monitor, MountainSnow, Ship, Wind, Library, Sun, Coffee, ArrowRight, LucideIcon } from "lucide-react";
import styles from "./MegaMenu.module.css";

const iconMap: Record<string, LucideIcon> = {
  Castle,
  Building,
  Landmark,
  Building2,
  Snowflake,
  Moon,
  Globe2,
  Monitor,
  MountainSnow,
  Ship,
  Wind,
  Library,
  Sun,
  Coffee
};

export const MegaMenuDigerDiller: React.FC<{ data: any }> = ({ data }) => {
  const megaMenu = data;
  const pathname = usePathname();
  const lang = pathname?.split("/")[1] || "tr";

  if (!megaMenu) return null;

  const renderSection = (section: any, idx: number) => {
    const Icon = iconMap[section.icon] || Globe2;
    const href = section.href
      ? `/${lang}${section.href}`
      : `#${section.title}`;
    return (
      <Link href={href} key={idx} className={styles.dillerSection}>
        <div className={styles.dillerIconWrapper}>
          <Icon size={24} strokeWidth={1.5} />
        </div>
        <div>
          <div className={styles.sectionTitle}>{section.title}</div>
          <p className={styles.sectionSubtitle}>{section.subtitle}</p>
        </div>
      </Link>
    );
  };

  return (
    <motion.div
      className={`${styles.megaMenuContainer} ${styles.dillerContainer}`}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
    >
      <div className={`${styles.megaMenuLeft} ${styles.megaMenuLeftPadded}`}>
        <div className={`${styles.megaMenuColumns} ${styles.megaMenuColumnsThree}`}>
          <div className={`${styles.col} ${styles.colDense}`}>
            {megaMenu.col1.map(renderSection)}
          </div>
          <div className={`${styles.col} ${styles.colDense}`}>
            {megaMenu.col2.map(renderSection)}
          </div>
          <div className={`${styles.col} ${styles.colDense}`}>
            {megaMenu.col3.map(renderSection)}
          </div>
        </div>
      </div>

      <div className={styles.dillerRight}>
        <div className={styles.verticalText}>
          {megaMenu.news.verticalText}
        </div>
        <div className={styles.newsCard}>
          <div className={styles.newsDateBadge}>{megaMenu.news.date}</div>
          <Image
            src="/sliders/gemini2.webp"
            alt={`${megaMenu.news.title} - Akademik International Diğer Diller Kursları`}
            title={megaMenu.news.title}
            className={styles.newsImage}
            width={300}
            height={350}
          />
          <div className={styles.newsOverlay}>
            <div className={styles.newsTitle}>{megaMenu.news.title}</div>
            <a href="#" className={styles.newsLink}>
              {megaMenu.news.button} <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
