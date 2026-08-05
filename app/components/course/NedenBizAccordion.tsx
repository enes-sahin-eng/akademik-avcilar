"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./NedenBizFeaturesSection.module.css";

interface Item {
  q: string;
  a: string;
}

export const NedenBizAccordion = ({ items }: { items: Item[] }) => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className={styles.accordion}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className={styles.accordionItem}>
            <button
              className={`${styles.accordionHeader} ${isOpen ? styles.accordionHeaderOpen : ""}`}
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              aria-expanded={isOpen}
            >
              <span>{item.q}</span>
              <ChevronDown
                size={18}
                className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
              />
            </button>
            <div className={isOpen ? styles.contentOpen : styles.contentClosed}>
              <div className={styles.accordionContent}>{item.a}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
