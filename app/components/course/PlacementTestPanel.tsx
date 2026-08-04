"use client";

import React, { useState, useEffect } from "react";
import "./PlacementTestBanner.css";

interface Props {
  tabText: string;
  isRtl: boolean;
  children: React.ReactNode;
}

/**
 * Sadece aç/kapa durumunu yöneten client kabuk. Panelin içeriği (başlıklar,
 * açıklamalar, liste, buton) server component'tan `children` ile gelir —
 * bu bileşen sözlükten yalnızca sekme etiketini prop olarak alır.
 */
export const PlacementTestPanel = ({ tabText, isRtl, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullyClosed, setIsFullyClosed] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsFullyClosed(false);
      return;
    }
    const timer = setTimeout(() => setIsFullyClosed(true), 500);
    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <>
      <div className={`banner-wrapper ${isOpen ? "open" : "closed"}`} dir="ltr">
        <div style={{ position: "relative", display: "flex", alignItems: "stretch" }}>
          <button onClick={() => setIsOpen(!isOpen)} className="banner-tab">
            {isFullyClosed && <span className="notification-dot" />}
            <span className="banner-tab-text">{tabText}</span>
          </button>
        </div>

        <div className="banner-content-panel" dir={isRtl ? "rtl" : "ltr"}>
          <div className="banner-top-gradient" />
          <div className="banner-inner-content">{children}</div>
        </div>
      </div>

      {isOpen && (
        <div className="banner-backdrop" onClick={() => setIsOpen(false)} />
      )}
    </>
  );
};
