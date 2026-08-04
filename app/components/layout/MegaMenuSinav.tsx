"use client";
import Image from 'next/image';

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { GraduationCap, Book, BookOpen, FileBadge, Award, Trophy, PenTool } from "lucide-react";
import styles from "./MegaMenu.module.css";

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  Book,
  BookOpen,
  FileBadge,
  Award,
  Trophy,
  PenTool
};

export const MegaMenuSinav: React.FC<{ data: any }> = ({ data }) => {
  const pathname = usePathname();
  const lang = pathname?.split('/')[1] || 'tr';
  const megaMenu = data;

  if (!megaMenu) return null;

  const renderSection = (section: any, idx: number) => {
    const Icon = iconMap[section.icon] || GraduationCap;
    const href = section.href ? `/${lang}${section.href}` : `#${section.title}`;
    
    return (
      <Link href={href} key={idx} className={styles.sinavSection}>
        <div className={styles.sinavIconWrapper}>
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
        <Image
          src="/campuses/sube-avcilar.jpg"
          alt="Akademik International Avcılar Merkez Şubesi - IELTS, TOEFL, YDS ve YÖKDİL akademik sınav hazırlık sınıfları"
          title="Akademik Sınav Kursları - Avcılar Merkez Şubesi"
          fill
          sizes="(max-width: 900px) 100vw, 320px"
          className={styles.rightFullImage}
        />
      </div>
    </motion.div>
  );
};
