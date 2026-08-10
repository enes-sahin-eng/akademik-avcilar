"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ArrowRight, ChevronDown } from "lucide-react";
import styles from "./LanguageInterestPopup.module.css";

interface Dict {
  title: string;
  subtitle: string;
  sectionLabel: string;
  expandMore: string;
  expandLess: string;
  cta: string;
  ctaPlaceholder: string;
  skip: string;
  closeLabel: string;
  languages: Record<string, string>;
}

interface Props {
  lang: string;
  dict: Dict;
}

interface LangItem {
  key: string;
  label: string;
  flagImg?: string;   // /flags/... webp yolu
  flagEmoji?: string; // görsel yoksa fallback emoji
  path: string;
}

const FEATURED: LangItem[] = [
  {
    key: "ingilizce",
    label: "İngilizce",
    flagImg: "/flags/ingilizce.svg",
    path: "ingilizce-kursu",
  },
  {
    key: "almanca",
    label: "Almanca",
    flagImg: "/flags/almanca.webp",
    path: "almanca-dil-kursu",
  },
  {
    key: "arapca",
    label: "Arapça",
    flagImg: "/flags/arapça.svg",
    path: "arapca-dil-kursu",
  },
];

const ALL_LANGUAGES: LangItem[] = [
  { key: "fransizca",          label: "Fransızca",        flagImg: "/flags/fransa.webp",     path: "fransizca-dil-kursu" },
  { key: "ispanyolca",         label: "İspanyolca",        flagImg: "/flags/ispanya.webp",    path: "ispanyolca-dil-kursu" },
  { key: "rusca",              label: "Rusça",             flagImg: "/flags/rusça.webp",      path: "rusca-dil-kursu" },
  { key: "japonca",            label: "Japonca",           flagImg: "/flags/japan.webp",      path: "japonca-dil-kursu" },
  { key: "korece",             label: "Korece",            flagImg: "/flags/kore.webp",       path: "korece-dil-kursu" },
  { key: "italyanca",          label: "İtalyanca",         flagImg: "/flags/italyanca.webp",  path: "italyanca-dil-kursu" },
  { key: "cince",              label: "Çince",             flagImg: "/flags/çince.webp",      path: "cince-dil-kursu" },
  { key: "portekizce",         label: "Portekizce",        flagImg: "/flags/portekiz.webp",   path: "portekizce-dil-kursu" },
  { key: "flemenkce",          label: "Flemenkçe",         flagImg: "/flags/flemenkçe.webp",  path: "flemenkce-dil-kursu" },
  { key: "farsca",             label: "Farsça",            flagImg: "/flags/farsça.webp",     path: "farsca-dil-kursu" },
  { key: "latince",            label: "Latince",           flagImg: "/flags/latince.webp",    path: "latince-dil-kursu" },
  { key: "osmanlica",          label: "Osmanlıca",         flagImg: "/flags/osmanlıca.webp",  path: "osmanlica-dil-kursu" },
  { key: "turkce",             label: "Türkçe",            flagImg: "/flags/türkçe.webp",     path: "turkce-dil-kursu" },
  { key: "yabancilara-turkce", label: "Yab. Türkçe",      flagImg: "/flags/türkçe.webp",     path: "yabancilara-turkce" },
  { key: "diger",              label: "Diğer Diller",      flagEmoji: "🌍",                   path: "diger-diller" },
];

const ALL = [...FEATURED, ...ALL_LANGUAGES];

function FlagImage({ item, size }: { item: LangItem; size: number }) {
  if (item.flagImg) {
    return (
      <Image
        src={item.flagImg}
        alt={`${item.label} bayrağı`}
        title={`${item.label} Kursu - Akademik International`}
        width={size}
        height={size}
        className={styles.flagImg}
      />
    );
  }
  return (
    <span className={styles.flagEmoji} style={{ fontSize: size * 0.7 }}>
      {item.flagEmoji}
    </span>
  );
}

export const LanguageInterestPopup = ({ lang, dict }: Props) => {
  const [visible, setVisible]   = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("langPopupSeen")) return;
    const timer = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    sessionStorage.setItem("langPopupSeen", "1");
    setVisible(false);
  };

  const selectedLang = ALL.find((l) => l.key === selected);

  if (!visible) return null;

  return (
    <div className={styles.backdrop} onClick={handleClose} role="dialog" aria-modal="true" aria-label={dict.title}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        <button className={styles.closeBtn} onClick={handleClose} aria-label={dict.closeLabel}>
          <X size={18} />
        </button>

        <div className={styles.header}>
          <h2 className={styles.title}>{dict.title}</h2>
          <p className={styles.subtitle}>{dict.subtitle}</p>
        </div>

        <p className={styles.sectionLabel}>{dict.sectionLabel}</p>
        <div className={styles.featuredGrid}>
          {FEATURED.map((item) => (
            <button
              key={item.key}
              className={`${styles.featuredCard} ${selected === item.key ? styles.selectedCard : ""}`}
              onClick={() => setSelected(item.key)}
            >
              <FlagImage item={item} size={40} />
              <span className={styles.featuredLabel}>{dict.languages[item.key] ?? item.label}</span>
              {selected === item.key && <span className={styles.checkMark}>✓</span>}
            </button>
          ))}
        </div>

        {/* Tüm diller genişleyici */}
        <button className={styles.expandBtn} onClick={() => setExpanded((v) => !v)}>
          <ChevronDown size={15} className={expanded ? styles.chevronUp : ""} />
          {expanded ? dict.expandLess : dict.expandMore}
        </button>

        {expanded && (
          <div className={styles.allGrid}>
            {ALL_LANGUAGES.map((item) => (
              <button
                key={item.key}
                className={`${styles.langChip} ${selected === item.key ? styles.selectedChip : ""}`}
                onClick={() => setSelected(item.key)}
              >
                <FlagImage item={item} size={24} />
                <span className={styles.chipLabel}>{dict.languages[item.key] ?? item.label}</span>
              </button>
            ))}
          </div>
        )}

        <div className={styles.footer}>
          {selectedLang ? (
            <Link
              href={`/${lang}/${selectedLang.path}`}
              className={styles.ctaBtn}
              onClick={handleClose}
            >
              {dict.cta}
              <ArrowRight size={16} />
            </Link>
          ) : (
            <button className={`${styles.ctaBtn} ${styles.ctaDisabled}`} disabled>
              {dict.ctaPlaceholder}
            </button>
          )}
          <button className={styles.skipBtn} onClick={handleClose}>
            {dict.skip}
          </button>
        </div>

        {/* SEO: gizli linkler — botlar tüm dil sayfalarını görür */}
        <nav aria-hidden="true" className={styles.seoLinks}>
          {ALL.map((item) => (
            <Link key={item.key} href={`/${lang}/${item.path}`} tabIndex={-1}>
              {item.label} Kursu
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};
