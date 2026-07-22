"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./Contact.module.css";
import { useDictionary } from "../../src/context/DictionaryContext";

export const ContactCorporate: React.FC = () => {
  const dict = useDictionary();
  const corporateData = dict?.iletisim?.corporate;

  if (!corporateData) return null;

  return (
    <motion.div 
      className={styles.corporateSection}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className={styles.corporateCard}>
        <div className={styles.corporateItem}>
          <div className={styles.corporateTitle}>{corporateData.title1}</div>
          <div className={styles.corporateValue}>{corporateData.value1}</div>
        </div>
        <div className={styles.corporateItem}>
          <div className={styles.corporateTitle}>{corporateData.title2}</div>
          <div className={styles.corporateValue}>{corporateData.value2}</div>
        </div>
      </div>
    </motion.div>
  );
};
