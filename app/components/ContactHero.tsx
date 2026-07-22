"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, ClipboardCheck } from "lucide-react";
import styles from "./Contact.module.css";
import { useDictionary } from "../../src/context/DictionaryContext";

export const ContactHero: React.FC = () => {
  const dict = useDictionary();
  const heroData = dict?.iletisim?.hero;

  if (!heroData) return null;

  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroContent}>
        <motion.h1 
          className={styles.heroTitle}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {heroData.title}
        </motion.h1>

        <motion.div 
          className={styles.phoneBlock}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.phoneIconBox}>
            <Phone size={24} />
          </div>
          <div className={styles.phoneTexts}>
            <span className={styles.phoneLabel}>{heroData.phoneLabel}</span>
            <span className={styles.phoneNumber}>{heroData.phone}</span>
          </div>
        </motion.div>

        <motion.div 
          className={styles.heroButtons}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a href="https://wa.me/905300000000" target="_blank" rel="noopener noreferrer" className={styles.whatsappBtn}>
            <MessageCircle size={20} />
            {heroData.whatsappBtn}
          </a>
          <a href="#" className={styles.examBtn}>
            <ClipboardCheck size={20} />
            {heroData.examBtn}
          </a>
        </motion.div>
      </div>
      
      {/* Curved bottom edge */}
      <div className={styles.heroCurve}></div>
    </div>
  );
};
