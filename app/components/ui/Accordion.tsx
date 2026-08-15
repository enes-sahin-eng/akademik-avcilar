"use client";

import React, { useState } from "react";
import { ArrowDownCircle, Plus } from "lucide-react";

interface AccordionItemData {
  q: string;
  a: string;
}

interface AccordionProps {
  items: AccordionItemData[];
  type?: "faq" | "course";
  styles: Record<string, string>;
}

export const Accordion = ({ items, type = "faq", styles }: AccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={styles.accordion}>
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;

        return (
          <div
            key={idx}
            className={`${styles.accordionItem} ${isOpen && type === "course" ? styles.accordionItemOpen : ""}`}
          >
            <button
              className={`${styles.accordionHeader} ${isOpen && type === "course" ? styles.accordionHeaderOpen : ""}`}
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              aria-expanded={isOpen}
            >
              {type === "faq" && (
                <ArrowDownCircle
                  size={20}
                  className={`${styles.arrowIcon} ${isOpen ? styles.arrowIconOpen : ""}`}
                />
              )}
              {item.q}
              {type === "course" && (
                <Plus
                  size={20}
                  className={`${styles.arrowIcon} ${isOpen ? styles.arrowIconOpen : ""}`}
                />
              )}
            </button>

            {/* SEO Uyumlu CSS ile Gizlenen/Açılan İçerik */}
            <div className={isOpen ? styles.contentOpen : styles.contentClosed}>
              <div className={styles.accordionBody} dangerouslySetInnerHTML={{ __html: item.a }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
