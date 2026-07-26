"use client";

import React, { useState } from "react";
import { Info, ArrowDownCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./FAQSection.module.css";
import { useDictionary } from "../../../src/context/DictionaryContext";

export const FAQSection = () => {
  const dict = useDictionary();
  const content = dict?.homeContentSection?.faq;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!content) return null;

  return (
    <motion.div 
      className={styles.faqContainer}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className={styles.faqHeader}>
        <Info size={28} className={styles.infoIcon} />
        <div className={styles.headerText}>
          <h2 className={styles.title}>{content.title}</h2>
          <p className={styles.desc}>{content.desc}</p>
        </div>
      </div>

      <div className={styles.accordion}>
        {content.items.map((item: any, idx: number) => (
          <div key={idx} className={styles.accordionItem}>
            <button 
              className={styles.accordionHeader}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <ArrowDownCircle 
                size={20} 
                className={`${styles.arrowIcon} ${openIndex === idx ? styles.arrowIconOpen : ""}`}
              />
              {item.q}
            </button>
            <AnimatePresence>
              {openIndex === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={styles.accordionContent}
                >
                  <div className={styles.accordionBody}>
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
