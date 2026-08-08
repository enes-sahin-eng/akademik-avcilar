import React from "react";
import Image from "next/image";
import "./PlacementTestBanner.css";
import { getDictionary, type Locale } from "../../dictionaries/getDictionary";
import { PlacementTestPanel } from "./PlacementTestPanel";

interface Props {
  lang: Locale;
}

const LEVELS: { label: string; highlight: boolean }[] = [
  { label: "A1", highlight: false },
  { label: "A2", highlight: false },
  { label: "B1", highlight: false },
  { label: "B2", highlight: false },
  { label: "C1", highlight: true  },
  { label: "C2", highlight: true  },
];

export default async function PlacementTestBanner({ lang }: Props) {
  const dict = await getDictionary(lang);
  const t = (dict as any)?.placementTest;

  const features = [
    {
      cls: "timer",
      text: t?.list1 || "Sadece 2 dakika sürer",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f26522" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      cls: "target",
      text: t?.list2 || "A1'den C2'ye tüm seviyeler",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
        </svg>
      ),
    },
    {
      cls: "chart",
      text: t?.list3 || "Anında detaylı sonuç",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
  ];

  return (
    <PlacementTestPanel
      tabText={t?.tabText?.replace("✦ ", "") || "Ücretsiz Seviye Sınavı"}
      isRtl={lang === "ar"}
    >
      {/* ── Navy header ───────────────────────────────────────── */}
      <div className="pt-header">
        <div className="pt-header-strip" aria-hidden="true" />

        <div className="pt-levels" aria-label="Kapsanan İngilizce seviyeleri">
          {LEVELS.map((lvl, i) => (
            <React.Fragment key={lvl.label}>
              <span className={`pt-level${lvl.highlight ? " pt-level-highlight" : ""}`}>
                {lvl.label}
              </span>
              {i < LEVELS.length - 1 && (
                <span className="pt-level-sep" aria-hidden="true">›</span>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="pt-header-row">
          <div className="pt-avatar-ring">
            <div className="pt-avatar">
              <Image
                src="/brand/mascot-peek.png"
                alt={t?.avatarAlt || "Avcılar İngilizce Kursu Eğitim Danışmanı"}
                title={t?.avatarTitle || "Avcılar Dil Okulu Seviye Sınavı"}
                width={44}
                height={44}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "left top" }}
              />
            </div>
          </div>
          <div>
            <p className="pt-title">{t?.title || "Seviyeni Öğren!"}</p>
            <p className="pt-subtitle">{t?.subtitle || "2 dakikada sonucunu al"}</p>
          </div>
        </div>
      </div>

      {/* ── White body ────────────────────────────────────────── */}
      <div className="pt-body">
        <p className="pt-desc">
          {t?.desc || "Hızlı bir test ile İngilizce seviyenizi belirleyin, size özel hazırlanmış programa hemen başlayın."}
        </p>

        <div className="pt-features">
          {features.map((f) => (
            <div key={f.cls} className="pt-feature">
              <span className={`pt-feat-icon pt-feat-icon-${f.cls}`}>{f.icon}</span>
              <span>{f.text}</span>
            </div>
          ))}
        </div>

        <a
          href="https://atc.akademik.com.tr/"
          target="_blank"
          rel="noopener noreferrer"
          className="pt-cta"
        >
          <span className="pt-cta-text">{t?.btnText || "Sınava Başla"}</span>
          <span className="pt-cta-arrow" aria-hidden="true">→</span>
        </a>

        <p className="pt-footer">{t?.footerText || "Ücretsiz · Kayıt gerektirmez"}</p>
      </div>
    </PlacementTestPanel>
  );
}
