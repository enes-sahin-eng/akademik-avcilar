"use client";

import { useState, useEffect } from "react";
import "./PlacementTestBanner.css";
import { useDictionary } from "../../src/context/DictionaryContext";

export default function PlacementTestBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullyClosed, setIsFullyClosed] = useState(true);
  const [showNudge, setShowNudge] = useState(false);
  
  const dict = useDictionary();
  const testDict = dict?.placementTest;

  // Assuming you can get current locale from path, or dictionary.
  // For simplicity, we can check document.dir or window.location, but Next.js router is better.
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  const isArabic = pathname.includes("/ar");

  useEffect(() => {
    if (isOpen) {
      setIsFullyClosed(false);
    } else {
      const timer = setTimeout(() => setIsFullyClosed(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const nudgeTimer = setTimeout(() => setShowNudge(true), 3000);
    const interval = setInterval(() => {
      setShowNudge(false);
      setTimeout(() => setShowNudge(true), 300);
    }, 8000);
    return () => {
      clearTimeout(nudgeTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div
        className={`banner-wrapper ${isOpen ? "open" : "closed"}`}
        dir="ltr"
      >
        <div style={{ position: "relative", display: "flex", alignItems: "stretch" }}>
          {isFullyClosed && (
            <div 
              className="mascot-breathe"
              style={{
                right: isArabic ? 'calc(100% - 28px)' : 'calc(100% - 20px)',
                top: '-15px',
                bottom: '-15px',
                width: '140px',
                overflow: 'visible',
              }}
            >
              <img
                src="/mascot-peek.png"
                alt={testDict?.avatarAlt || "Danışman"}
                className="mascot-img-absolute"
              />
            </div>
          )}

          {isFullyClosed && showNudge && (
            <div className="nudge-bubble" style={{ right: '40px', top: '-40px' }}>
              <div className="nudge-inner" dir={isArabic ? "rtl" : "ltr"}>
                {testDict?.nudgeText || "Seviyeni öğrenmek ister misin?"}
                <div className="nudge-arrow" />
              </div>
            </div>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="banner-tab"
          >
            {isFullyClosed && (
              <span className="notification-dot" />
            )}
            
            <span
              className="banner-tab-text"
            >
              {testDict?.tabText || "✦ Ücretsiz Seviye Sınavı"}
            </span>
          </button>
        </div>

        <div className="banner-content-panel" dir={isArabic ? "rtl" : "ltr"}>
          <div className="banner-top-gradient" />

          <div className="banner-inner-content">
            <div className="banner-header">
              <div className="banner-avatar">
                <img
                  src="/mascot-peek.png"
                  alt={testDict?.avatarAlt || "Danışman"}
                />
              </div>
              <div>
                <h3 className="banner-title">
                  {testDict?.title || "Seviyeni Öğren!"}
                </h3>
                <p className="banner-subtitle">
                  {testDict?.subtitle || "2 dakikada sonucunu al"}
                </p>
              </div>
            </div>

            <p className="banner-desc">
              {testDict?.desc || "Hızlı bir test ile İngilizce seviyenizi belirleyin, size özel hazırlanmış programa hemen başlayın."}
            </p>

            <div className="banner-list">
              {[
                { icon: "⏱️", text: testDict?.list1 || "Sadece 2 dakika sürer" },
                { icon: "🎯", text: testDict?.list2 || "A1'den C2'ye tüm seviyeler" },
                { icon: "📊", text: testDict?.list3 || "Anında detaylı sonuç" },
              ].map((item, i) => (
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
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="banner-backdrop"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
