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
  tabLanguage?: string;
  tabExam?: string;
  examSectionLabel?: string;
  examExpandMore?: string;
  examExpandLess?: string;
  examCta?: string;
  examCtaPlaceholder?: string;
  exams?: Record<string, string>;
}

interface Props {
  lang: string;
  dict: Dict;
}

interface LangItem {
  key: string;
  label: string;
  flagImg?: string;
  flagEmoji?: string;
  path: string;
}

interface ExamItem {
  key: string;
  label: string;
  abbr: string;
  color: string;
  path: string;
}

const FEATURED: LangItem[] = [
  { key: "ingilizce", label: "İngilizce", flagImg: "/flags/ingilizce.svg", path: "ingilizce-kursu" },
  { key: "almanca",   label: "Almanca",   flagImg: "/flags/almanca.webp",  path: "almanca-dil-kursu" },
  { key: "arapca",    label: "Arapça",    flagImg: "/flags/arapca.svg",    path: "arapca-dil-kursu" },
];

const ALL_LANGUAGES: LangItem[] = [
  { key: "fransizca",          label: "Fransızca",     flagImg: "/flags/fransa.webp",     path: "fransizca-dil-kursu" },
  { key: "ispanyolca",         label: "İspanyolca",    flagImg: "/flags/ispanya.webp",    path: "ispanyolca-dil-kursu" },
  { key: "rusca",              label: "Rusça",          flagImg: "/flags/rusca.webp",      path: "rusca-dil-kursu" },
  { key: "japonca",            label: "Japonca",        flagImg: "/flags/japan.webp",      path: "japonca-dil-kursu" },
  { key: "korece",             label: "Korece",         flagImg: "/flags/kore.webp",       path: "korece-dil-kursu" },
  { key: "italyanca",          label: "İtalyanca",      flagImg: "/flags/italyanca.webp",  path: "italyanca-dil-kursu" },
  { key: "cince",              label: "Çince",          flagImg: "/flags/cince.webp",      path: "cince-dil-kursu" },
  { key: "portekizce",         label: "Portekizce",     flagImg: "/flags/portekiz.webp",   path: "portekizce-dil-kursu" },
  { key: "flemenkce",          label: "Flemenkçe",      flagImg: "/flags/flemenkce.webp",  path: "flemenkce-dil-kursu" },
  { key: "farsca",             label: "Farsça",         flagImg: "/flags/farsca.webp",     path: "farsca-dil-kursu" },
  { key: "latince",            label: "Latince",        flagImg: "/flags/latince.webp",    path: "latince-dil-kursu" },
  { key: "osmanlica",          label: "Osmanlıca",      flagImg: "/flags/osmanlica.webp",  path: "osmanlica-dil-kursu" },
  { key: "turkce",             label: "Türkçe",         flagImg: "/flags/turkce.webp",     path: "turkce-dil-kursu" },
  { key: "yabancilara-turkce", label: "Yab. Türkçe",   flagImg: "/flags/turkce.webp",     path: "yabancilara-turkce" },
  { key: "diger",              label: "Diğer Diller",   flagEmoji: "🌍",                   path: "diger-diller" },
];

const ALL = [...FEATURED, ...ALL_LANGUAGES];

const FEATURED_EXAMS: ExamItem[] = [
  { key: "ielts", label: "IELTS",  abbr: "IELTS", color: "#c8102e", path: "ielts-hazirlik-kursu" },
  { key: "toefl", label: "TOEFL",  abbr: "TOEFL", color: "#0047ab", path: "toefl-hazirlik-kursu" },
  { key: "goethe", label: "Goethe",   abbr: "Goethe",  color: "#1c1c1e", path: "almanca-goethe-sinavi-hazirlik-kursu" },
];

const ALL_EXAMS: ExamItem[] = [
  { key: "yokdil", label: "YÖKDİL",   abbr: "YÖKDİL", color: "#0369a1", path: "yokdil-hazirlik-kursu" },
  { key: "yds",   label: "YDS",    abbr: "YDS",   color: "#6d28d9", path: "yds-hazirlik-kursu" },
  { key: "cae",    label: "Cambridge", abbr: "CAE",    color: "#1e3a5f", path: "cae-kursu" },
  { key: "toeic",  label: "TOEIC",    abbr: "TOEIC",   color: "#0891b2", path: "toeic-hazirlik-kursu" },
  { key: "pte",    label: "PTE",      abbr: "PTE",     color: "#0ea5e9", path: "pte-kursu" },
  { key: "yks",    label: "YKS-DİL",  abbr: "YKS",    color: "#d97706", path: "yks-dil-ydt-hazirlik-kursu" },
  { key: "diger",  label: "Diğer Sınavlar", abbr: "...",  color: "#475569", path: "akademik-sinavlar" },
];

const ALL_EXAMS_FLAT = [...FEATURED_EXAMS, ...ALL_EXAMS];

function FlagImage({ item, size }: { item: LangItem; size: number }) {
  if (item.flagImg) {
    return (
      <Image
        src={item.flagImg}
        alt={`${item.label} bayrağı`}
        title={`${item.label} Kursu - Akademik International`}
        width={size}
        height={size}
        loading="eager"
        unoptimized
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

function ExamBadge({ item }: { item: ExamItem }) {
  return (
    <span className={styles.examBadge} style={{ background: item.color }}>
      {item.abbr}
    </span>
  );
}

export const LanguageInterestPopup = ({ lang, dict }: Props) => {
  const [visible, setVisible]       = useState(false);
  const [selected, setSelected]     = useState<string | null>(null);
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [expandedLang, setExpandedLang]     = useState(false);
  const [expandedExam, setExpandedExam]     = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("langPopupSeen")) return;
    const timer = setTimeout(() => setVisible(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    sessionStorage.setItem("langPopupSeen", "1");
    setVisible(false);
  };

  const selectedLang     = ALL.find((l) => l.key === selected);
  const selectedExamItem = ALL_EXAMS_FLAT.find((e) => e.key === selectedExam);

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

        <div className={styles.contentScroll}>
          <p className={styles.sectionLabel}>{dict.sectionLabel}</p>
          <div className={styles.featuredGrid}>
            {FEATURED.map((item) => (
              <button
                key={item.key}
                className={`${styles.featuredCard} ${selected === item.key ? styles.selectedCard : ""}`}
                onClick={() => { setSelected(item.key); setSelectedExam(null); }}
              >
                <FlagImage item={item} size={40} />
                <span className={styles.featuredLabel}>{dict.languages[item.key] ?? item.label}</span>
                {selected === item.key && <span className={styles.checkMark}>✓</span>}
              </button>
            ))}
          </div>

          <button className={styles.expandBtn} onClick={() => setExpandedLang((v) => !v)}>
            <ChevronDown size={15} className={expandedLang ? styles.chevronUp : ""} />
            {expandedLang ? dict.expandLess : dict.expandMore}
          </button>

          {expandedLang && (
            <div className={styles.allGrid}>
              {ALL_LANGUAGES.map((item) => (
                <button
                  key={item.key}
                  className={`${styles.langChip} ${selected === item.key ? styles.selectedChip : ""}`}
                  onClick={() => { setSelected(item.key); setSelectedExam(null); }}
                >
                  <FlagImage item={item} size={24} />
                  <span className={styles.chipLabel}>{dict.languages[item.key] ?? item.label}</span>
                </button>
              ))}
            </div>
          )}

          <div style={{ height: '24px' }}></div>

          <p className={styles.sectionLabel}>{dict.examSectionLabel ?? "Popüler sınavlar"}</p>
          <div className={styles.featuredGrid}>
            {FEATURED_EXAMS.map((item) => (
              <button
                key={item.key}
                className={`${styles.featuredCard} ${selectedExam === item.key ? styles.selectedCard : ""}`}
                onClick={() => { setSelectedExam(item.key); setSelected(null); }}
              >
                <ExamBadge item={item} />
                <span className={styles.featuredLabel}>{dict.exams?.[item.key] ?? item.label}</span>
                {selectedExam === item.key && <span className={styles.checkMark}>✓</span>}
              </button>
            ))}
          </div>

          <button className={styles.expandBtn} onClick={() => setExpandedExam((v) => !v)}>
            <ChevronDown size={15} className={expandedExam ? styles.chevronUp : ""} />
            {expandedExam ? (dict.examExpandLess ?? "Daha az göster") : (dict.examExpandMore ?? "Tüm sınavları gör")}
          </button>

          {expandedExam && (
            <div className={styles.allGrid}>
              {ALL_EXAMS.map((item) => (
                <button
                  key={item.key}
                  className={`${styles.langChip} ${selectedExam === item.key ? styles.selectedChip : ""}`}
                  onClick={() => { setSelectedExam(item.key); setSelected(null); }}
                >
                  <ExamBadge item={item} />
                  <span className={styles.chipLabel}>{dict.exams?.[item.key] ?? item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.footer}>
          {selectedLang ? (
            <Link href={`/${lang}/${selectedLang.path}`} className={styles.ctaBtn} onClick={handleClose}>
              {dict.cta}
              <ArrowRight size={16} />
            </Link>
          ) : selectedExamItem ? (
            <Link href={`/${lang}/${selectedExamItem.path}`} className={styles.ctaBtn} onClick={handleClose}>
              {dict.examCta ?? "Sınava Hazırlan"}
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

        {/* SEO: gizli linkler — botlar tüm dil ve sınav sayfalarını görür */}
        <nav aria-hidden="true" className={styles.seoLinks}>
          {ALL.map((item) => (
            <Link key={item.key} href={`/${lang}/${item.path}`} tabIndex={-1}>
              {item.label} Kursu
            </Link>
          ))}
          {ALL_EXAMS_FLAT.map((item) => (
            <Link key={`exam-${item.key}`} href={`/${lang}/${item.path}`} tabIndex={-1}>
              {item.label} Hazırlık Kursu
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};
