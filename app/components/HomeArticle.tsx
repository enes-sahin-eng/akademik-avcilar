"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./HomeArticle.module.css";
import { useDictionary } from "../../src/context/DictionaryContext";

export const HomeArticle = () => {
  const dict = useDictionary();
  const content = dict?.homeContentSection?.article;
  const [isExpanded, setIsExpanded] = useState(false);

  if (!content) return null;

  return (
    <div className={styles.articleContainer}>
      <motion.p 
        className={styles.paragraph}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {content.p1}
      </motion.p>

      <motion.h2 
        className={styles.heading}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        {content.h2}
      </motion.h2>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={styles.contentWrapper}
          >
            <p className={styles.paragraph}>{content.p2}</p>
            
            {content.expandedContent && content.expandedContent.map((item: any, index: number) => {
              if (item.type === "h3") {
                return <h3 key={index} className={styles.subHeading}>{item.text}</h3>;
              }
              if (item.type === "p") {
                return (
                  <p key={index} className={styles.paragraph}>
                    {item.text.split(/ (Avcılar'da En İyi İngilizce Kursu|Avcılar İngilizce Kursları|Avcılar İngilizce Kursu|Avcılar'ın En Çok Tavsiye Edilen İngilizce Kursu|Akademik International Yabancı Dil Kursu|Genel İngilizce|YKS-DİL \(YDT\) Hazırlık Kursu|TOEFL|IELTS) /g).map((part: string, i: number) => 
                      ["Avcılar'da En İyi İngilizce Kursu", "Avcılar İngilizce Kursları", "Avcılar İngilizce Kursu", "Avcılar'ın En Çok Tavsiye Edilen İngilizce Kursu", "Akademik International Yabancı Dil Kursu", "Genel İngilizce", "YKS-DİL (YDT) Hazırlık Kursu", "TOEFL", "IELTS"].includes(part) ? <strong key={i} className={styles.highlightText}>{part}</strong> : part
                    )}
                  </p>
                );
              }
              return null;
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.toggleContainer}>
        <button 
          className={styles.toggleBtn} 
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? content.readLess : content.readMore}
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>
    </div>
  );
};
