"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, ScrollText, BadgeCheck, Briefcase, Star, Handshake } from "lucide-react";
import styles from "./MegaMenu.module.css";
import { usePathname } from "next/navigation";

const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  ScrollText,
  BadgeCheck,
  Briefcase,
  Star,
  Handshake
};

export const MegaMenuHakkimizda: React.FC<{ data: any }> = ({ data }) => {
  const hakkimizdaMenu = data;
  const pathname = usePathname();
  const lang = pathname.split("/")[1] || "tr";

  if (!hakkimizdaMenu) return null;

  return (
    <motion.div
      className={`${styles.megaMenuContainer} ${styles.hakkimizdaContainer}`}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
    >
      <ul className={styles.hakkimizdaList}>
        {hakkimizdaMenu.map((item: any, idx: number) => {
          const Icon = iconMap[item.icon] || BookOpen;
          return (
            <li key={idx}>
              {item.href ? (
                <Link href={`/${lang}${item.href}`} className={styles.hakkimizdaItem}>
                  <div className={styles.hakkimizdaIconWrapper}>
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <span>{item.title}</span>
                </Link>
              ) : (
                <a href="#" className={styles.hakkimizdaItem}>
                  <div className={styles.hakkimizdaIconWrapper}>
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <span>{item.title}</span>
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
};
