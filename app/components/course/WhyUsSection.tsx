"use client";

import React, { useState } from "react";
import styles from "./WhyUsSection.module.css";
import { useDictionary } from "../../../src/context/DictionaryContext";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedAdvantageStack } from "./AnimatedAdvantageStack";

const AccordionItem = ({ q, a, isOpen, onClick }: { q: string, a: string, isOpen: boolean, onClick: () => void }) => {
  return (
    <div className={styles.accordionItem}>
      <button 
        className={styles.accordionHeader} 
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span>{q}</span>
        <ChevronDown 
          size={20} 
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className={styles.accordionContent}>
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface Props {
  courseKey: string;
}

export const WhyUsSection = ({ courseKey }: Props) => {
  const dictionary = useDictionary();
  const pageData = (dictionary as any)[courseKey]?.whyUs;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!pageData) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{pageData.title}</h2>
          <p className={styles.subtitle}>{pageData.subtitle}</p>
        </div>

        <div className={styles.contentWrapper}>
          {/* Left: Animated Card Stack for Advantages */}
          <div className={styles.advantagesGrid}>
            <AnimatedAdvantageStack advantages={pageData.advantages} btnNext={pageData.btnNext} />
          </div>

          {/* Right: Accordion FAQs */}
          <div className={styles.accordionContainer}>
            {pageData.faqs?.map((faq: any, index: number) => (
              <AccordionItem 
                key={index}
                q={faq.q}
                a={faq.a}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
