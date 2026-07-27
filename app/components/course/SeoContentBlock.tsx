"use client";

import React from "react";
import { motion } from "framer-motion";
import { useDictionary } from "../../../src/context/DictionaryContext";
import { Check } from "lucide-react";
import styles from "./SeoContentBlock.module.css";

interface SeoContentBlockProps {
  courseKey: string;
}

export function SeoContentBlock({ courseKey }: SeoContentBlockProps) {
  const dictionary = useDictionary();
  const seoData = (dictionary as any)?.[courseKey]?.seoContent;

  if (!seoData || seoData.length === 0) {
    return null;
  }

  return (
    <section className={styles.container}>
      {seoData.map((block: any, index: number) => (
        <motion.div
          key={index}
          className={styles.block}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <h2 className={styles.title}>{block.title}</h2>
          
          {block.desc && <p className={styles.desc}>{block.desc}</p>}
          
          {block.bullets && block.bullets.length > 0 && (
            <ul className={`${styles.bulletList} ${block.summary ? styles.hasSummary : ''}`}>
              {block.bullets.map((bullet: string, idx: number) => (
                <li key={idx} className={styles.bulletItem}>
                  <div className={styles.iconWrapper}>
                    <Check size={20} />
                  </div>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
          
          {block.summary && (
            <div className={styles.summary}>
              {block.summary}
            </div>
          )}
        </motion.div>
      ))}
    </section>
  );
}
