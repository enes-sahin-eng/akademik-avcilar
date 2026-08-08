"use client";

import React, { useState, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import styles from "./HomeArticle.module.css";

interface Props {
  children: React.ReactNode;
  readMoreText: string;
  readLessText: string;
}

/**
 * Expandable içerik bileşeni.
 * 
 * SEO notu: Children (expandedContent) HTML'de her zaman mevcuttur — 
 * sadece CSS clip ile gizlenir. Arama motorları ve preview araçları 
 * tüm metni görebilir. JS olmadan da içerik DOM'da bulunur.
 */
export const ExpandableArticle = ({ children, readMoreText, readLessText }: Props) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (open && containerRef.current) {
      // Kapatırken içeriğin en başına (veya bir miktar üstüne) kaydır
      // Navigasyon barını (yaklaşık 100px) hesaba katarak ofset veriyoruz
      const elementTop = containerRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementTop - 120,
        behavior: "smooth",
      });
    }
    setOpen((prev) => !prev);
  };

  return (
    <div ref={containerRef}>
      <div className={open ? styles.expandedOpen : styles.expandedClosed}>
        <div className={styles.contentWrapper}>
          {children}
        </div>
      </div>

      <div className={styles.toggleContainer}>
        <button
          className={styles.toggleBtn}
          onClick={handleToggle}
          aria-expanded={open}
        >
          {open ? readLessText : readMoreText}
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>
    </div>
  );
};
