"use client";
import Image from 'next/image';

import React from "react";
import { motion } from "framer-motion";
import { Building2, Phone } from "lucide-react";
import styles from "./MegaMenu.module.css";

export const MegaMenuSubeler: React.FC<{ data: any }> = ({ data }) => {
  const megaMenu = data;

  if (!megaMenu) return null;

  return (
    <motion.div
      className={`${styles.megaMenuContainer} ${styles.subelerContainer}`}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
    >
      <div className={`${styles.megaMenuLeft} ${styles.megaMenuLeftPadded}`}>
        {/* Aktif Kampüsler */}
        <div className={styles.subelerGroup}>
          <div className={styles.subelerHeader}>
            <Building2 size={20} className={styles.subelerIcon} />
            <div className={styles.subelerTitle}>{megaMenu.activeCampusesTitle}</div>
          </div>
          <div className={styles.subelerColumns}>
            <ul className={styles.subelerList}>
              {megaMenu.activeCampusesCol1.map((item: any, idx: number) => (
                <li key={idx} className={styles.subelerItem}>
                  <a href="#" className={styles.subelerLink}>{item.name}</a>
                  {item.badge && <span className={styles.subelerBadge}>{item.badge}</span>}
                </li>
              ))}
            </ul>
            <ul className={styles.subelerList}>
              {megaMenu.activeCampusesCol2.map((item: any, idx: number) => (
                <li key={idx} className={styles.subelerItem}>
                  <a href="#" className={styles.subelerLink}>{item.name}</a>
                  {item.badge && <span className={styles.subelerBadge}>{item.badge}</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Genişleyen Ağ */}
        <div className={styles.subelerGroup}>
          <div className={styles.subelerHeader}>
            <Building2 size={20} className={styles.subelerIcon} />
            <div className={styles.subelerTitle}>{megaMenu.expandingTitle}</div>
          </div>
          <div className={styles.subelerColumns}>
            <ul className={styles.subelerList}>
              {megaMenu.expandingCol1.map((item: any, idx: number) => (
                <li key={idx} className={styles.subelerItem}>
                  <a href="#" className={styles.subelerLink}>{item.name}</a>
                </li>
              ))}
            </ul>
            <ul className={styles.subelerList}>
              {megaMenu.expandingCol2.map((item: any, idx: number) => (
                <li key={idx} className={styles.subelerItem}>
                  <a href="#" className={styles.subelerLink}>{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.subelerRight}>
        <div className={styles.verticalText}>
          {megaMenu.promo.verticalText}
        </div>
        
        <div className={styles.subelerPromoArea}>
          <div className={styles.subelerCircleGroup}>
            <Image
              src="/campuses/sube-avcilar.jpg"
              alt={`${megaMenu.promo.title} - Akademik International Avcılar Merkez Şubesi`}
              title={megaMenu.promo.title}
              className={styles.subelerCircleImage}
              width={250}
              height={250}
            />
            <div className={styles.subelerTopBadge}>
              {megaMenu.promo.badge}
            </div>
            <div className={styles.subelerBottomBox}>
              <div className={styles.subelerBoxTitle}>{megaMenu.promo.title}</div>
              <div className={styles.subelerPhone}>
                <Phone size={14} /> {megaMenu.promo.phone}
              </div>
            </div>
          </div>
          
          <button className={styles.subelerBtnBlue}>
            {megaMenu.promo.button1}
          </button>
          
          <button className={styles.subelerBtnGray}>
            {megaMenu.promo.button2}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
