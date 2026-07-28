"use client";

import React, { useState } from "react";
import { ArrowDownCircle, Plus } from "lucide-react";
import { motion } from "framer-motion";

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
          <div key={idx} className={`${styles.accordionItem} ${isOpen && type === "course" ? styles.accordionItemOpen : ""}`}>
            <button 
              className={`${styles.accordionHeader} ${isOpen && type === "course" ? styles.accordionHeaderOpen : ""}`}
              onClick={() => setOpenIndex(isOpen ? null : idx)}
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
            <motion.div
              initial={false}
              animate={{ 
                height: isOpen ? "auto" : 0, 
                opacity: isOpen ? 1 : 0 
              }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
              className={styles.accordionContent}
            >
              <div className={styles.accordionBody}>
                {item.a}
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};
