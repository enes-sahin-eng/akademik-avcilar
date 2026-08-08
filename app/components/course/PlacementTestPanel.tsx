"use client";

import React, { useState, useEffect } from "react";
import "./PlacementTestBanner.css";

interface Props {
  tabText: string;
  isRtl: boolean;
  children: React.ReactNode;
}

export const PlacementTestPanel = ({ tabText, isRtl, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullyClosed, setIsFullyClosed] = useState(true);

  useEffect(() => {
    if (isOpen) { setIsFullyClosed(false); return; }
    const t = setTimeout(() => setIsFullyClosed(true), 500);
    return () => clearTimeout(t);
  }, [isOpen]);

  return (
    <>
      <div
        className={`pt-wrapper ${isOpen ? "pt-wrapper--open" : "pt-wrapper--closed"}`}
        dir="ltr"
      >
        {/* Tab trigger */}
        <button
          className="pt-tab"
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-label={tabText}
        >
          {isFullyClosed && <span className="pt-tab-dot" aria-hidden="true" />}
          <span className="pt-tab-icon" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </span>
          <span className="pt-tab-text">{tabText}</span>
        </button>

        {/* Sliding panel */}
        <div
          className="pt-panel"
          dir={isRtl ? "rtl" : "ltr"}
          style={{ position: "relative" }}
          role="dialog"
          aria-modal="true"
          aria-hidden={!isOpen}
        >
          <button
            className="pt-panel-close"
            onClick={() => setIsOpen(false)}
            aria-label="Kapat"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <line x1="1" y1="1" x2="9" y2="9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="9" y1="1" x2="1" y2="9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          {children}
        </div>
      </div>

      {isOpen && (
        <div
          className="pt-backdrop"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};
