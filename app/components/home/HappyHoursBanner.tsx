"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MousePointerClick } from "lucide-react";
import styles from "./HappyHoursBanner.module.css";
import { useDictionary } from "../../../src/context/DictionaryContext";

export const HappyHoursBanner = () => {
  const dict = useDictionary();
  const content = dict?.homeContentSection?.happyHours;
  
  // Fake countdown timer for visual demo
  const [timeLeft, setTimeLeft] = useState({ days: 9, hours: 12, minutes: 20 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes } = prev;
        if (minutes > 0) minutes -= 1;
        else if (hours > 0) { hours -= 1; minutes = 59; }
        else if (days > 0) { days -= 1; hours = 23; minutes = 59; }
        return { days, hours, minutes };
      });
    }, 60000); // update every minute
    return () => clearInterval(timer);
  }, []);

  if (!content) return null;

  return (
    <motion.div 
      className={styles.banner}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <h2 className={styles.title}>{content.title}</h2>
      <motion.div 
        className={styles.subtitle}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        {content.subtitle}
      </motion.div>

      <div className={styles.timerGrid}>
        <div className={styles.timerBlock}>
          <span className={styles.timerValue}>{timeLeft.days}</span>
          <span className={styles.timerLabel}>{content.days}</span>
        </div>
        <div className={styles.timerBlock}>
          <span className={styles.timerValue}>{timeLeft.hours}</span>
          <span className={styles.timerLabel}>{content.hours}</span>
        </div>
        <div className={styles.timerBlock}>
          <span className={styles.timerValue}>{timeLeft.minutes}</span>
          <span className={styles.timerLabel}>{content.minutes}</span>
        </div>
      </div>

      <motion.button 
        className={styles.btn}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {content.btnText} <MousePointerClick size={18} />
      </motion.button>
    </motion.div>
  );
};
