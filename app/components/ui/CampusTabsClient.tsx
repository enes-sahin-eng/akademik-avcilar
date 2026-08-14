"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import styles from "./CampusTabs.module.css";

interface CampusData {
  name: string;
  label: string;
  phone: string;
  image: string;
  href?: string;
  mapQuery?: string;
}

interface CampusTabsClientProps {
  campusesData: CampusData[];
  lang: string;
  viewBranchText?: string;
  title?: string;
  desc?: string;
}

export const CampusTabsClient = ({ 
  campusesData, 
  lang, 
  viewBranchText = "Şubeyi İncele",
  title = "",
  desc = "" 
}: CampusTabsClientProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPaused || !campusesData || campusesData.length === 0) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => {
        const nextIndex = current === campusesData.length - 1 ? 0 : current + 1;
        
        // Tabları yatayda otomatik kaydırma mantığı (sayfayı dikeyde kaydırmadan)
        if (tabsRef.current && tabsRef.current.parentElement) {
          const tabButtons = tabsRef.current.querySelectorAll('button');
          const targetButton = tabButtons[nextIndex];
          if (targetButton) {
            const wrapper = tabsRef.current.parentElement;
            const scrollPos = targetButton.offsetLeft - (wrapper.clientWidth / 2) + (targetButton.offsetWidth / 2);
            wrapper.scrollTo({ left: scrollPos, behavior: 'smooth' });
          }
        }
        
        return nextIndex;
      });
    }, 5000); // 5 saniyede bir değişir

    return () => clearInterval(interval);
  }, [isPaused, campusesData]);

  if (!campusesData || campusesData.length === 0) return null;

  return (
    <div 
      className={styles.container}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {(title || desc) && (
        <div className={styles.sectionHeader}>
          {title && <h2 className={styles.sectionTitle}>{title}</h2>}
          {desc && <p className={styles.sectionDesc}>{desc}</p>}
        </div>
      )}

      <div className={styles.tabsHeaderWrapper}>
        <div className={styles.tabsHeader} ref={tabsRef}>
          {campusesData.map((campus, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`${styles.tabButton} ${activeIndex === idx ? styles.tabButtonActive : ""}`}
            >
              {campus.label || campus.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.contentWrapper}>
        {campusesData.map((campus, idx) => {
          const isActive = activeIndex === idx;
          const searchQuery = campus.mapQuery || `Akademik Yabancı Dil Kursları ${campus.name}`;
          
          return (
            <div
              key={idx}
              className={`${styles.contentItem} ${isActive ? styles.contentItemActive : styles.contentItemHidden}`}
            >
              <div className={styles.imageContainer}>
                <Image
                  src={campus.image || "/brand/logo2.png"}
                  alt={`${campus.name} Şubesi - Akademik International Dil Kursu`}
                  title={`${campus.name} Yabancı Dil Eğitim Merkezi`}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className={styles.image}
                  unoptimized
                />
              </div>

              <div className={styles.textContent}>
                <div className={styles.label}>{campus.label}</div>
                <h3 className={styles.title}>{campus.name}</h3>
                
                <a
                  href={`tel:${campus.phone.replace(/\s/g, "")}`}
                  className={styles.phoneLink}
                >
                  <Phone size={20} fill="currentColor" /> {campus.phone}
                </a>

                {campus.href && (
                  <Link href={`/${lang}${campus.href}`} className={styles.actionButton}>
                    {viewBranchText} <ArrowRight size={18} className="ml-2" />
                  </Link>
                )}
              </div>

              <div className={styles.mapContainer}>
                <iframe
                  className={styles.mapIframe}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(searchQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${campus.name} Şubesi Harita Konumu`}
                ></iframe>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
