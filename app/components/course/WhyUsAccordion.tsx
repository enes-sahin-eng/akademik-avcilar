"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FaqItem[];
  styles: Record<string, string>;
}

/**
 * Sadece açılır/kapanır durumu yöneten client bileşen. Metinler server
 * component'tan prop olarak gelir; sözlüğe erişmez.
 */
export const WhyUsAccordion = ({ faqs, styles }: Props) => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <>
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div className={styles.accordionItem} key={index}>
            <button
              className={styles.accordionHeader}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              aria-expanded={isOpen}
            >
              <span>{faq.q}</span>
              <ChevronDown
                size={20}
                className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
              />
            </button>

            {/* İçerik DOM'da hep var, sadece CSS ile gizleniyor (SEO uyumlu) */}
            <div className={isOpen ? styles.contentOpen : styles.contentClosed}>
              <div className={styles.accordionContent}>{faq.a}</div>
            </div>
          </div>
        );
      })}
    </>
  );
};
