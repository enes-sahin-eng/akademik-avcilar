"use client";

import React, { useState } from "react";
import { HelpCircle, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./CourseFAQ.module.css";
import { useDictionary } from "../../../src/context/DictionaryContext";

interface CourseFAQProps {
  courseKey: string;
}

export const CourseFAQ: React.FC<CourseFAQProps> = ({ courseKey }) => {
  const dict = useDictionary();
  const content = (dict as any)?.[courseKey]?.faq;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!content) return null;

  return (
    <motion.section 
      className={styles.faqSectionWrapper}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className={styles.container}>
        <div className={styles.faqContainer}>
          {/* Left Column: Title & Desc (Sticky) */}
          <div className={styles.faqHeader}>
            <div className={styles.iconWrapper}>
              <HelpCircle size={28} />
            </div>
            <div className={styles.headerText}>
              <h2 className={styles.title}>{content.title}</h2>
              <p className={styles.desc}>{content.desc}</p>
            </div>
          </div>

          {/* Right Column: Accordion Items */}
          <div className={styles.accordion}>
            {content.items.map((item: any, idx: number) => {
              const isOpen = openIndex === idx;
              
              return (
                <div key={idx} className={`${styles.accordionItem} ${isOpen ? styles.accordionItemOpen : ""}`}>
                  <button 
                    className={`${styles.accordionHeader} ${isOpen ? styles.accordionHeaderOpen : ""}`}
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                  >
                    {item.q}
                    <Plus 
                      size={20} 
                      className={`${styles.arrowIcon} ${isOpen ? styles.arrowIconOpen : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
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
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
};
