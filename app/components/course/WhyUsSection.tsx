"use client";

import React, { useState } from "react";
import styles from "./WhyUsSection.module.css";
import { useDictionary } from "../../../src/context/DictionaryContext";
import { ChevronDown } from "lucide-react";
import { AnimatedAdvantageStack } from "./AnimatedAdvantageStack";

const AccordionItem = ({
  q,
  a,
  isOpen,
  onClick,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  onClick: () => void;
}) => {
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

      {/* Framer Motion silindi. HTML DOM'da hep var, sadece CSS ile gizleniyor */}
      <div className={isOpen ? styles.contentOpen : styles.contentClosed}>
        <div className={styles.accordionContent}>{a}</div>
      </div>
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
            <AnimatedAdvantageStack
              advantages={pageData.advantages}
              btnNext={pageData.btnNext}
            />
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
