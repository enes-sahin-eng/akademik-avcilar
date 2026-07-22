"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import styles from "./Contact.module.css";
import { useDictionary } from "../../src/context/DictionaryContext";

export const ContactCampuses: React.FC = () => {
  const dict = useDictionary();
  const campusesData = dict?.iletisim?.campuses;

  if (!campusesData) return null;

  return (
    <div className={styles.campusesSection}>
      <motion.h2 
        className={styles.campusesTitle}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {campusesData.title}
      </motion.h2>

      <div className={styles.campusesGrid}>
        {campusesData.items.map((campus: any, index: number) => (
          <motion.div 
            key={index} 
            className={styles.campusCard}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <div className={styles.campusImageWrapper}>
              <div className={styles.campusTopBadge}>{campus.name}</div>
              <img 
                src={`https://picsum.photos/seed/campus-${index}/200/200`} 
                alt={campus.name} 
                className={styles.campusImage} 
              />
            </div>
            <div className={styles.campusInfoBox}>
              <div className={styles.campusLabel}>{campus.label}</div>
              <a href={`tel:${campus.phone.replace(/\s/g, '')}`} className={styles.campusPhone}>
                <Phone size={14} /> {campus.phone}
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button 
        className={styles.campusApplyBtn}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {campusesData.button}
      </motion.button>
    </div>
  );
};
