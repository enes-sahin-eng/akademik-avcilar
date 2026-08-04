import React from "react";
import Image from "next/image";
import "./PlacementTestBanner.css";
import { getDictionary, type Locale } from "../../dictionaries/getDictionary";
import { PlacementTestPanel } from "./PlacementTestPanel";

interface Props {
  lang: Locale;
}

export default async function PlacementTestBanner({ lang }: Props) {
  const dict = await getDictionary(lang);
  const testDict = (dict as any)?.placementTest;

  const listItems = [
    { icon: "⏱️", text: testDict?.list1 || "Sadece 2 dakika sürer" },
    { icon: "🎯", text: testDict?.list2 || "A1'den C2'ye tüm seviyeler" },
    { icon: "📊", text: testDict?.list3 || "Anında detaylı sonuç" },
  ];

  return (
    <PlacementTestPanel
      tabText={testDict?.tabText || "✦ Ücretsiz Seviye Sınavı"}
      isRtl={lang === "ar"}
    >
      <div className="banner-header">
        <div className="banner-avatar">
          <Image
            src="/brand/mascot-peek.png"
            alt={testDict?.avatarAlt || "Avcılar İngilizce Kursu Eğitim Danışmanı"}
            title={testDict?.avatarTitle || "Avcılar Dil Okulu Seviye Sınavı"}
            width={48}
            height={48}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "left top" }}
          />
        </div>
        <div>
          <div className="banner-title">
            {testDict?.title || "Seviyeni Öğren!"}
          </div>
          <p className="banner-subtitle">
            {testDict?.subtitle || "2 dakikada sonucunu al"}
          </p>
        </div>
      </div>

      <p className="banner-desc">
        {testDict?.desc ||
          "Hızlı bir test ile İngilizce seviyenizi belirleyin, size özel hazırlanmış programa hemen başlayın."}
      </p>

      <div className="banner-list">
        {listItems.map((item, i) => (
          <div key={i} className="banner-list-item">
            <span className="banner-list-icon">{item.icon}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>

      <a
        href="https://atc.akademik.com.tr/"
        target="_blank"
        rel="noopener noreferrer"
        className="banner-action-btn"
      >
        {testDict?.btnText || "Sınava Başla →"}
      </a>

      <p className="banner-footer">
        {testDict?.footerText || "Ücretsiz · Kayıt gerektirmez"}
      </p>
    </PlacementTestPanel>
  );
}
